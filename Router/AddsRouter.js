const express = require('express')
const router = express.Router()
const  AddsController=require('../Controllers/adds.Controoler')

router.route('/').post(AddsController.creatAdd)


module.exports = router