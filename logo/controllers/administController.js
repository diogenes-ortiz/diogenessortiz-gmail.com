const fs = require('fs');
//const path = require('path');

//const productsFilePath = path.join(__dirname, './data/productos.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const administController = {
    main : function(req, res) {
        res.render("administ");
    },
    cargar : function(req, res) {
        let products =  {
            foto : req.body.foto,
            nombre : req.body.producto,
            precio : req.body.precio,
            talles : req.body.Talles,
            categoria : req.body.categoria,
            genero : req.body.sexo,
            sale : req.body.sale
        }

        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);
        datajs.push(products);
        datajson = JSON.stringify(datajs, null, 4)
        fs.writeFileSync("./data/products.json", datajson);

        res.redirect("/administrador/");

    },

    editVista : function(req, res, next) {

    },

    edit : function(req, res, next) {
        let idProduct = req.params.idProduct;

        let datajson = fs.readFileSync('./data/products.json');
        let datajs = JSON.parse(datajson);

        let productToEdit = datajs[idProduct];
        res.render("putt", {productToEdit : productToEdit});
    }

}



module.exports = administController;