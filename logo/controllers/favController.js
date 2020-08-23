const fs = require('fs');
const db = require('../database/models');
const {Op} = require('sequelize');

const favController = {
    list : function(req, res, next) {
        if(res.locals.userLog != undefined) {
            db.User.findAll({
                where: {
                    id: res.locals.userLog.id
                },
                include: [{association: "products",include: {association: "images"}}]
            })
            .then(function(favs) {
                if(favs){
                    res.render('fav', {favs:favs})
                } else {
                    res.render('fav')
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        } else {
            res.redirect('/users/login');
        }
    },
    
    add : function(req, res, next) {
        if(res.locals.userLog != undefined) {
            let productId = req.body.productId
            db.User.findOne({
                where: {
                    id : res.locals.userLog.id
                }
            })
            .then(function(user) {
                user.addProduct(productId)
                .then(function(){
                    res.redirect('/favorites')
                })
            })
            .catch(function(error) {
                console.log(error);
            })
        } else {
            res.redirect('/users/login')
        }
    },

    remove : function(req, res, next) {
        if(res.locals.userLog != undefined) {
            let productId = req.body.productId
            db.User.findOne({
                where: {
                    id : res.locals.userLog.id,
                }
            })
            .then(function(user) {
                user.removeProduct(productId)
                .then(function(){
                    res.redirect('/favorites')
                })
            })
            .catch(function(error) {
                console.log(error);
            })
        } else {
            res.redirect('/users/login')
        }
    }
}

module.exports = favController;