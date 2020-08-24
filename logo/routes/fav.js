var express = require('express');
var router = express.Router();
var favController = require('../controllers/favController');

/* GET favorite list */
router.get("/", favController.list);

/* POST favorite add */
router.post("/", favController.add);

/* DELETE favorite remove */
router.delete("/", favController.remove);

module.exports = router;