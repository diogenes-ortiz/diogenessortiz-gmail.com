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
                res.render("products/productsMix", {
                    products:products,
                    title: Categoria,
                    fileCSS: "products/hombres.css"
                })
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
    
        /*
        //Traes la base de datos 
        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);
        //Creas variable con array vacio
        let productsId= []
        //Recorres la variable donde esta almacenada la base de datos
        datajs.forEach(function (product) {
        //le preguntas si el id es igual al que pasaron por la url 
            if (product.id == req.params.productsId) {
                productsId.push(product)
            }
        })
*/
}

module.exports = productsController