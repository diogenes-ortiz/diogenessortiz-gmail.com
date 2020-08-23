const fs = require('fs');
const db = require('../database/models');
const {Op} = require('sequelize');

const productsController = {
    mix : function(req, res, next) {
        db.Product.findAll({
            where: {
                genre_id: req.params.productsGenero
            },
            include: [{association: "genre"}, {association: "images"}]
        })
            .then(function(products) {
                console.log(products.genre_id)
                res.render("products/productsMix", {
                    products:products,
                    title: "Productos",
                    fileCSS: "products/hombres.css"
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    },
    
    finish : function(req,res,next){
        res.render('products/thanksForBuying')
    },

    saleMain : function(req, res, next) {
        db.Product.findAll({
            where: {
                sale: req.params.productsSale
            },
            include: [{association: "genre"}, {association: "images"}]
        })
            .then(function(products) {
                //console.log(products)
                res.render("products/sale", {
                    products:products,
                    title: "Sale",
                    fileCSS: "products/sale.css"
                });
            })
            .catch(function(error) {
                console.log(error)
            })
    },

    category : function(req, res, next) {
        db.Product.findAll({
            where: {
                category_id: req.params.productsCategory
            },
            include: [{association: "genre"}, {association: "images"}]
        })
            .then(function(products) {
                let Categoria = products[0].genre_id == 1 ? "Hombre" : "Mujer";
                if (Categoria == null) {
                    res.send("CATEGORIA VACIA")
                } else {
                    res.render("products/productsMix", {
                        products:products,
                        title: Categoria,
                        fileCSS: "products/hombres.css"
                    })
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    },

    detail : function(req, res, next) {
        db.Product.findByPk(req.params.productsId, {
            include: [{association: "genre"}, 
                        {association: "images"}, 
                        {association: "brand"},
                        {association: "categories"},
                        {association: "sizes"},
                        {association: "colours"}]
        })
            .then(function(detail) {
                res.render("products/detailM", {
                    detail:detail,
                    title: "Detalle de producto",
                    fileCSS: "products/detail.css"
                });
            })
            .catch(function(error) {
                console.log(error)
            })
    }
}

module.exports = productsController