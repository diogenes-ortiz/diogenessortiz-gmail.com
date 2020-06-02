var express = require('express');
var router = express.Router();
var productsController = require("../controllers/productsController")

/* GET home page. */
router.get("/genero/:productsGenero", productsController.Mix);

router.get("/sale/:productsSale", productsController.saleMain);

router.get("/categoria/:productsCategory", productsController.category);

router.get("/detalle", productsController.detail);

router.get("/detalleM", productsController.detailM);

module.exports = router;