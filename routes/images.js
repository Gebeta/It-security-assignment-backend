var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({dest: './public/images/'});
const imageController = require('../controllers/image.controller')
const { checkHasPermission } = require('../midddlewares/permission');

/**
 * get Image
 * 
 * @route Get /items/images
 * @returns {object} 200 - string object
 * @returns {Error}  default - Unexpected error
 */
router.get('/:name', checkHasPermission('view file'), imageController.getImage);

 /**
 * upload Image
 * 
 * @route POST /items/upload
 * @returns {object} 200 - string object
 * @returns {Error}  default - Unexpected error
 */
router.post('/upload', upload.array('pdf_file', 1), imageController.uploadImage);

 module.exports = router;