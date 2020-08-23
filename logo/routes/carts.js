var express = require('express');
var router = express.Router();
var cartsController = require('../controllers/cartsController');
let authMiddleware = require('../middlewares/authMiddleware');
let guestMiddleware = require('../middlewares/guestMiddleware');
let adminMiddleware = require('../middlewares/adminMiddleware');

/* GET cart list */
router.get('/', cartsController.list);

//router.get('/pago', /*authMiddleware,*/ cartsController.pago);

//router.get('/', /*authMiddleware,*/ cartsController.list);

module.exports = router;
