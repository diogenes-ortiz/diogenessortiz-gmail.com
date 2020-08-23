var express = require('express');
var router = express.Router();
var productsController = require("../controllers/productsController");
let authMiddleware = require('../middlewares/authMiddleware');
let guestMiddleware = require('../middlewares/guestMiddleware');
let adminMiddleware = require('../middlewares/adminMiddleware');

/* GET product detail */
router.get("/detalle/:productsId", productsController.detail);

/* GET product gender */
router.get("/genero/:productsGenero", productsController.mix);

/* GET product sale */
router.get("/sale/:productsSale", productsController.saleMain);

/* GET product category */
router.get("/categoria/:productsCategory", productsController.category);

router.get("/comprafinalizada", productsController.finish)

module.exports =  router;