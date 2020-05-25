const fs = require('fs');
const path = require('path');

const productController = {
    product: function (req,res) {
        res.render('product')
    }
}

module.exports = productController;