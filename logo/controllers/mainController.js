const fs = require('fs');
const path = require('path');
let bcrypt = require('bcrypt')
let { check, validationResult, body } = require ('express-validator')

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

        let usuarios = JSON.parse(fs.readFileSync('./data/users.json', {encoding:'utf-8'}));
        
        let n = usuarios.length;
        let userId = usuarios[n-1].id;
        if(errors.isEmpty()) {
        usuario = {
            id:userId + 1,
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: bcrypt.hashSync(req.body.password, 10),
            image: req.files[0].filename,
            category: req.body.category
        }

        let usersJSON = fs.readFileSync('./data/users.json', {encoding:'utf-8'});
        usersJS = JSON.parse(usersJSON);
        usersJS.push(usuario)
        usersJSON = JSON.stringify(usersJS, null, 4);
        fs.writeFileSync('./data/users.json', usersJSON);
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
        let usersJSON = fs.readFileSync('./data/users.json',{encoding:'utf-8'})
        usersJS = JSON.parse(usersJSON);
        let userLog;
        usersJS.forEach((users) => {
            console.log(users.password)
            let check = bcrypt.compareSync(req.body.password, users.password);
            console.log(check);
            if(users.email == req.body.email && check == true) {
                    userLog = users; 
                    req.session.userLog = userLog;
                    console.log(req.session.userLog)
                    console.log(userLog)
                    res.locals.userLog = userLog;
                    console.log(res.locals.userLog)
                    res.redirect('/')
            }

        });
        console.log(users.password)

        if(userLog == undefined) {
            return res.render('login', {errors : [
                {msj : "Contraseña o email invalido"}
            ]});
        }

        

        /*if(errors.isEmpty()) {
        usuario = {
            email: req.body.email,
            password: req.body.password
        }
        res.redirect('/')
        } else {
            res.render('login', {errors:errors.errors})
        }*/
   }


}

module.exports=mainController