var express = require('express');
var router = express.Router();
var productsController = require("../controllers/productsController")

/* GET home page. */
router.get("/hombres", productsController.hombreMain);

router.get("/mujeres", productsController.mujerMain);

router.get("/sale", productsController.saleMain);

router.get("/detalle", productsController.detail);

router.get("/detalleM", productsController.detailM);

module.exports = router;