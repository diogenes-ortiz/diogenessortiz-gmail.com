const fs = require('fs');

const productsController = {
    hombreMain : function(req, res, next) {
        res.render("products/hombres")
    },

    mujerMain : function(req, res, next) {
        res.render("products/mujeres")
    },

    saleMain : function(req, res, next) {
        res.render("products/sale")
    },

    detail : function(req, res, next) {
        res.render("products/detail")
    },

    detailM : function(req, res, next) {
        res.render("products/detailM")
    }
}

module.exports = productsController