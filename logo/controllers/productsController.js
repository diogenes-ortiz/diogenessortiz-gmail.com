const fs = require('fs');

const productsController = {
    Mix : function(req, res, next) {
        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);

        let genero = []
		datajs.forEach(function (product) {
			if (product.genero == req.params.productsGenero) {
				genero.push(product)
			}
		})

        res.render("products/productsMix", {datajs : datajs, genero : genero, nombreGenero : req.params.productsGenero});
    },

    mujerMain : function(req, res, next) {

        res.render("products/mujeres")
    },

    saleMain : function(req, res, next) {

        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);

        let sale = []
        datajs.forEach(function (products) {
            if(products.sale == "si" && products.sale == req.params.productsSale) {
                sale.push(products)
            }
        });

        res.render("products/sale", {sale : sale, nombreTitulo : req.params.productsSale })
    },

    category : function(req, res, next) {

        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);

        let genero = []

        datajs.forEach(function (products) {
            if(products.categoria == req.params.productsCategory) {
                genero.push(products);
            }
        })

        res.render("products/productsMix", {datajs : datajs, genero : genero, nombreGenero : req.params.productsCategory});
    },

    detail : function(req, res, next) {
        res.render("products/detail")
    },

    detailM : function(req, res, next) {
        res.render("products/detailM")
    }
}

module.exports = productsController