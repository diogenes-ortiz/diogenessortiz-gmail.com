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

    register: function(req, res, next){
        res.render('register', {
            title: "Registro",
            fileCSS: "register.css"
        });
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
            res.render('register', {
                errors:errors.errors,
                title: "Registro",
                fileCSS: "register.css"
            });
         }
    },

    login: function(req, res, next){
        res.render('login', {
            title: "Login",
            fileCSS: "login.css"
        });
    },

    sendlogin: function(req,res, next){
        let errors = validationResult(req);

        if(errors.isEmpty()) { // si NO hay errores

            //tomar los datos
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
                       //req.session.id = id;

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
            return res.render('login', {
                errors: errors.errors,
                title: "Login",
                fileCSS: "login.css"
            });
        }
    },

    profile : function(req, res, next) {
        let users = req.params.id
        db.User.findByPk(users)
            .then(function(user) {
                console.log(user);
                res.render("users", {user})
            })
    },

    logout : function(req, res, next) {
        req.session.destroy();
        res.redirect("/");
    },

    edit : function(req, res, next) {
        db.User.update({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: bcrypt.hashSync(req.body.password, 10) } , {
                where : {
                    id : req.params.id
                }
            }
        ).then(function(user) {
            console.log(user)
            res.redirect("/")
            })
    }
}

module.exports = mainController