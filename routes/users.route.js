
var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')
const { checkHasPermission } = require('../midddlewares/permission');
const isAdmin = require('../midddlewares/admin')

router.get('/', isAdmin, userController.viewAllUsers);


router.get('/myProfile', checkHasPermission(['view user']), userController.viewUserProfile);


router.get('/:id', isAdmin, userController.viewUser);


// router.patch('/', userController.updateUser);

router.patch('/:id', isAdmin, userController.disable_enable_User);


router.delete('/:id', isAdmin, userController.removeUser);



module.exports = router;
