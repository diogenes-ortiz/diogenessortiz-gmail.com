let fs = require('fs')
var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController');
let logDBMiddleWare = require('../middlewares/logDBMiddleWare')
let { check, validationResult, body } = require ('express-validator')

/* GET home page. */
router.get('/', mainController.home);
router.get('/register', mainController.register);
router.post('/register',logDBMiddleWare ,[
    check ('name').isLength({min:1}).withMessage('Es necesario ingresar un nombre'),
    check('secondname').isLength({min:1}).withMessage('Es necesario ingresar un apellido'),
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min:7}).withMessage('La contraseña debe tener al menos 7 caracteres'),
    body('email').custom(function(req,res,next){
        let usuariosJSON = fs.readFileSync('./data/usuarios.json', { encoding: 'utf-8'});
        let usuarios = JSON.parse(usuariosJSON)
        for (let i = 0; i< usuarios.length; i++) {
            if (usuarios[i].email == req.body.email) {
                return false;
            }
           
        }
        return true; 
    }).withMessage('Mail ya en uso')
] ,mainController.sendregister);

router.get('/login', mainController.login);
router.post('/login', mainController.sendlogin);
module.exports = router;
