var express = require('express');
var router = express.Router();
var moviesContoller = require("../controllers/moviesController")

router.get("/", moviesContoller.list);


module.exports = router;