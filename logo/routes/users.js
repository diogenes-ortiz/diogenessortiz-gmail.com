var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController');

/* GET home page. */
router.get('/', mainController.home);
router.get('/register', mainController.register);
router.post('/register', mainController.sendregister);
router.get('/login', mainController.login);
router.post('/login', mainController.sendlogin);
module.exports = router;
