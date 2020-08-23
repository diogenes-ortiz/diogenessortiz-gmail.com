var express = require('express');
var router = express.Router();
var administController = require("../controllers/administController");
let authMiddleware = require('../middlewares/authMiddleware');
let guestMiddleware = require('../middlewares/guestMiddleware');
let adminMiddleware = require('../middlewares/adminMiddleware');
let { check, validationResult, body } = require ('express-validator');

/* GET product create */
router.get('/', /*adminMiddleware,*/ administController.main);
/* POST product store */
router.post('/',[
    check('descripcion').isLength({min:20}).withMessage(""),
    check('categoria').isLength({min:1}).withMessage(""),
    check('nombre').isLength({min:5}).withMessage(""),
    check('precio').isLength({min:1}).withMessage("")
], administController.cargar);

/* GET product edit */
router.get("/edit/:productId", /*adminMiddleware,*/ administController.edit);
/* PUT product update */
router.put("/edit/:productId", administController.update);

/* DELETE product delete */
router.delete('/delete/:productId', adminMiddleware, administController.destroy);

module.exports = router;