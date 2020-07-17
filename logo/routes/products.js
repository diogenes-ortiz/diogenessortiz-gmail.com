var express = require('express');
var router = express.Router();
var productsController = require("../controllers/productsController");
let authMiddleware = require('../middlewares/authMiddleware');
let guestMiddleware = require('../middlewares/guestMiddleware');
let adminMiddleware = require('../middlewares/adminMiddleware');

/* GET detail */
router.get("/detalle/:productsId", productsController.detail);
/* GET gender */
router.get("/genero/:productsGenero", productsController.mix);
/* GET sale */
router.get("/sale/:productsSale", productsController.saleMain);
/* GET category */
router.get("/categoria/:productsCategory", productsController.category);


module.exports =  router;