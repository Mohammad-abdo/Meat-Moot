const express = require('express')
const router = express.Router()
const  contactController=require('../Controllers/contactController')

router.route('/').post(contactController.SendReport).get(contactController.getAllReports)
router.route('/:id').get(contactController.deletReports)


module.exports = router