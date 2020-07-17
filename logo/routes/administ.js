var express = require('express');
var router = express.Router();
var administController = require("../controllers/administController");
let authMiddleware = require('../middlewares/authMiddleware');
let guestMiddleware = require('../middlewares/guestMiddleware');
let adminMiddleware = require('../middlewares/adminMiddleware');

/* GET product create */
router.get('/', /*adminMiddleware,*/ administController.main);
router.post('/', administController.cargar);
/* GET product edit */
router.get("/edit/:productId", /*adminMiddleware,*/ administController.edit);
router.put("/edit/:productId", administController.update);
/* GET product delete */
router.delete('/delete/:productId', adminMiddleware, administController.destroy);

module.exports = router;