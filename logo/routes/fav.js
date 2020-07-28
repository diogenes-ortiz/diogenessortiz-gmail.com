var express = require('express');
var router = express.Router();
var productsController = require("../controllers/favController");
const favController = require('../controllers/favController');

router.get("/:id", favController.main);
router.post("/:id", favController.get);

module.exports = router;