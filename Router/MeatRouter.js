const express =require('express')

const router= express.Router()
const MeatController= require('../Controllers/MeatControllers')

const AuthController = require("../Controllers/authController");


router.route('/').post(MeatController.Savemeat).get(MeatController.GetAllmeats)
// stats Route
router.route("/movie-stats").get(MeatController.gitmeatstats);

router
  .route("/:id")
  .patch(MeatController.updatemeat)
  .get(MeatController.Getmeat)
  .delete(AuthController.protect,AuthController.restrictTo("admin"),MeatController.deletemeat);


router  
    .route("/monthly-plan/:year")
    .get(MeatController.getMonthlyPlan);

module.exports = router;