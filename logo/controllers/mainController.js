const fs = require('fs');
const path = require('path');

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
    sendregister: function(req, res, next){
 
        res.redirect('/');
    },
    login: function(req, res, next){
        res.render('login');
    },
    sendlogin: function(req,res, next){

                res.redirect('/')
            }
}

module.exports=mainController