const express = require('express');
const multer = require('multer')

const isAdmin = require('../midddlewares/admin')

const { checkHasPermission } = require('../midddlewares/permission');
const { validateReport } = require('../midddlewares/validation/report')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  },
})

const upload = multer({ storage: storage })

var router = express.Router();

var reportController = require('../controllers/feedback.controller')


// router.post('/',upload.single('image'), checkHasPermission("create feedback"),reportController.createReport); 

router.post('/', checkHasPermission("create feedback"),  reportController.createReport);


router.get('/myReport', checkHasPermission("view their feedback"), reportController.viewMyReport);


router.get('/', checkHasPermission("view all feedback"), reportController.viewAllReport);


router.get('/:id', checkHasPermission("view all feedback"), reportController.viewReportById);


router.delete('/:id', checkHasPermission("remove issue"), isAdmin, reportController.removeReport);




module.exports = router;
