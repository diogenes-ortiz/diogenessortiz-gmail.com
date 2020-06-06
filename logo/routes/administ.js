var express = require('express');
var router = express.Router();
var administController = require("../controllers/administController");


router.get('/', administController.main);
router.post('/', administController.cargar);
router.put("/edit", administController.edit);


module.exports = router;