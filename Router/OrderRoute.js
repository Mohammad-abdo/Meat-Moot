const express = require("express");

const router = express.Router();

const OrderController = require("../Controllers/order");
const AuthController = require("../Controllers/authController");

router.route("/success").post(OrderController.creatOrder);

// router
//   .route("/")
//   .get(
//     AuthController.protect,
//     AuthController.restrictTo("admin"),
//     OrderController.GetAllOrders
//   );
//   router
//   .route("/:id")
//   .get(AuthController.protect,OrderController.GetMyOrder)
router.route("/").get(OrderController.GetAllOrders);
// router.route('/').get( OrderController.GetAllOrders);
  router
  .route("/:id")
  .get(OrderController.GetMyOrderByUserId)
  .get(OrderController.GetMyOrderByMeatId)
module.exports = router;
