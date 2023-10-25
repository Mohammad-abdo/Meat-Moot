const express =require('express')

const router= express.Router()
const MeatController= require('../Controllers/MeatControllers')



router.route('/').post(MeatController.Savemeat).get(MeatController.Getmeat)


module.exports = router;