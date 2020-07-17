const fs = require('fs');
const db = require('../database/models');
const {Op} = require('sequelize');
//const path = require('path');

//const productsFilePath = path.join(__dirname, './data/productos.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const administController = {
    main : function(req, res) {
        res.render("administ");
    },
    cargar : function(req, res) {
        db.Product.create({
            name : req.body.producto,
            description : req.body.descripcion,
            category_id : req.body.categoria,
            //brand_id
            //colour_id
            genre_id : req.body.sexo,
            sizes : req.body.Talles,
            price : req.body.precio,
            sale : req.body.sale
        });

        res.redirect("/administrador/");
    },

    edit : function(req, res) {
        let pedidoProducto = db.Product.findByPk(req.params.productId);
        let pedidoCategorias = db.Category.findAll();
        let pedidoGeneros = db.Genre.findAll();
        let pedidoTalles = db.Size.findAll();

        Promise.all([pedidoProducto, pedidoCategorias, pedidoGeneros, pedidoTalles])
            .then(function([productToEdit, categories, genres, sizes, toto]) {
                res.render("administEdit", {
                    productToEdit: productToEdit, 
                    categories:categories, 
                    genres: genres, 
                    sizes:sizes
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    },

    update: function(req, res) {
        db.Product.update({
            name: req.body.producto,
            category_id: req.body.categoria,
            gender_id: req.body.sexo,
            sizes: req.body.Talles,
			price: req.body.precio,
            sale: req.body.sale
        }, {
            where: {
                id: req.params.id
            }
        });

		res.redirect('/');
    },
    
    destroy : function(req, res) {
        let pdtoId = req.params.productId;
     
        let datajson = fs.readFileSync('./data/products.json');
        let products = JSON.parse(datajson);

        let productosNoEliminados = products.filter(product=>{
		    return product.id != pdtoId;
		});

        let productosNoEliminadosJSON = JSON.stringify(productosNoEliminados, null, 4);
		fs.writeFileSync("./data/products.json", productosNoEliminadosJSON);

        res.redirect('/'); 
	}

}



module.exports = administController;