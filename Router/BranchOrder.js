const express = require("express");

const router = express.Router();

const OrderController = require("../Controllers/branchOrderController");
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
.patch(OrderController.CanselOrder).get(OrderController.GetMyOrderById)

  router.route("/meat/:meatId").get(OrderController.GetMyOrderByMeatId)

module.exports = router;