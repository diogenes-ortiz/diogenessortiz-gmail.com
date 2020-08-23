var express = require('express');
var router = express.Router();
var favController = require('../controllers/favController');

/* GET favorite list */
router.get("/:id", favController.list);

/* POST favorite add */
router.post("/:id", favController.add);

/* DELETE favorite remove */
router.delete("/:id", favController.remove);

module.exports = router;