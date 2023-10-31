const express = require('express')
const router = express.Router()
const  contactController=require('../Controllers/contactController')

router.route('/').post(contactController.SendReport)


module.exports = router