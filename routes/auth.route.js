var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth.controller');
const { validatRequest } =require('../midddlewares/validation/auth')

router.post('/login', validatRequest('loginUser'), authController.login);

router.post('/signup', validatRequest('createUser'),authController.signup);

router.post('/logout', authController.logout);

router.post('/adminlogin',validatRequest('loginUser'), authController.adminLogin);

module.exports = router;