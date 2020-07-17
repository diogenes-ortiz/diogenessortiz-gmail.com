const fs = require('fs');
const path = require('path');
let bcrypt = require('bcrypt')
let { check, validationResult, body } = require ('express-validator')
const db = require('../database/models');
const {Op} = require('sequelize');

const mainController = {
    home: function (req,res) {
        res.render('index')
    },

    carrito : function (req,res){
        res.render('carrito')
    },

    pago : function (req,res){
        res.render('pago')
    },

    register: function(req, res, next){
        res.render('registro');
    },

    sendregister: function(req,res,next){
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            db.User.create({
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.files[0].filename,
            });

            res.redirect('/')
         } else{
             res.render('registro', {errors:errors.errors})
         }
    },

    login: function(req, res, next){
        res.render('login');
    },

    sendlogin: function(req,res, next){
        let errors = validationResult(req);

        if(errors.isEmpty()) { // si NO hay errores
            //let usersJSON = fs.readFileSync('./data/users.json', { encoding: 'utf-8'});
            //let users;

            //tomar os datos
            db.User.findOne({
                //buscar al usuario en la base de datos, por email
                where: {email: req.body.email}
            })
            // Validación info de usuario
            .then((user) => {
                //si el usuario existe
                //console.log(user.id)
                if(user != undefined){
                    //bcrpy hashcompare  entre user.password y req.body.password
                   if (bcrypt.compareSync(req.body.password, user.password)) {
                       // Setear en session el ID del usuario

                       req.session.usuarioLogueado = user;

                       // Setear la cookie
                       if (req.body.recordame != undefined) {
                           res.cookie('recordame', user.email, { maxAge: 60000 * 120 }); // 2 horas
                       }

                       // Redireccionamos al visitante a su perfil
                       console.log("yo")
                       return res.redirect('/');
                   } else {   //password no matchea
                       //let usuarioInvalido = 'El usuario es inválido, verifique sus datos';
                       res.render('login', {errors: [
                        {msg: 'Password inválido !'}
                    ]});//{mensaje: usuarioInvalido});
                   }
                } else {   //usuario NO encontrado
                    //let usuarioInvalido = 'El usuario es inválido, verifique sus datos';
                    res.render('login', {errors: [
                        {msg: 'Usuario inválido !'}
                    ]});//{mensaje: usuarioInvalido});
                }
            })
        }else{   //hay errores
            return res.render('login', {errors: errors.errors});
        }
    },

    infoUser : function(req, res, next) {
        res.render("users")
    }
}

module.exports=mainController