var express = require('express');
var router = express.Router();
var administController = require("../controllers/administController");


router.get('/', administController.main);
router.post('/', administController.cargar);
router.get("/edit/:idProduct", administController.editVista);
router.put("/edit", administController.edit);


module.exports = router;