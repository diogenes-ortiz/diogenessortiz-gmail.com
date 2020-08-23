let fs = require('fs');
var express = require('express');
var router = express.Router();
let bcrypt = require('bcrypt');
let multer = require('multer');
var mainController = require('../controllers/mainController');
let authMiddleware = require('../middlewares/authMiddleware');
let guestMiddleware = require('../middlewares/guestMiddleware');
let adminMiddleware = require('../middlewares/adminMiddleware');
let { check, validationResult, body } = require ('express-validator');
let path = require('path');
const db = require('../database/models');

/* MULTER setup */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', mainController.home);

/* GET user register */
router.get('/register', guestMiddleware, mainController.register);
router.post('/register', upload.any(), /*logDBMiddleWare,*/ [
    check ('first_name').isLength({min:2}).withMessage('Es necesario ingresar un nombre'),
    check('last_name').isLength({min:2}).withMessage('Es necesario ingresar un apellido'),
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
], mainController.sendregister);

/* GET user login */
router.get('/login', /*guestMiddleware,*/ mainController.login);

//db.User.findAll()
  //.then(function(users) {
    router.post('/login', /*logDBMiddleWare,*/ [
      check('email').isEmail().withMessage('Email o contraseña invalida'),/*.custom(value => {/*
          //let usuariosJSON = fs.readFileSync('./data/users.json', { encoding: 'utf-8'});
          //let usuarios = JSON.parse(usuariosJSON);
          /*for (const user of users) {
              console.log(value);
              console.log("Hola3")
        			if(user.email === value){
                  console.log('mail ya en uso');
                  return true;
  			      }
	  	    }
		      return false;
        }),*/
      check('password').isLength({min:8})/*.custom(value => {*/
          //let usuariosJSON = fs.readFileSync('./data/users.json', { encoding: 'utf-8'});
          //let usuarios = JSON.parse(usuariosJSON);
          /*for (const user of users) {
              console.log(value);
              console.log("Hola5")
              if(bcrypt.compareSync(value, user.password)){
                  console.log('contraseña incorrecta');
                  return true;
  			      }
	  	    }
		      return false;
      }),*/
  ], mainController.sendlogin);
//})

/* GET user profile */
router.get("/info/:id", mainController.profile);
/* POST user edit */
router.post("/info/:id", mainController.edit);
/* POST user logout */
router.post("/info", mainController.logout);

module.exports = router;