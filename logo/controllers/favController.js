const fs = require('fs');
const db = require('../database/models');
const {Op} = require('sequelize');

const favController = {
    main : function(req, res, next) {
        res.render("fav");
    },
    get : function(req, res, next) {
        db.Cart_Product.create({
            product_id : req.body.id,
            price : req.body.price
        }) .then(function(fav) {
            console.log(fav)
        })
    }
}


module.exports = favController;