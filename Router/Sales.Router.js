const express = require("express");
const router = express.Router();
const salesController = require("../Controllers/salesController");

router
  .route("/:branchId")
  .get(salesController.GetSalesByBranchId)
  .patch(salesController.UpdateSaleByBranchId)
  .delete(salesController.DeletSalByBranshId);

router.route("/orders/:branchId").get(salesController.GetAllBranchOrder);

router.route("/").get(salesController.GetAllSales).delete(salesController.DeletSaleById)

module.exports = router;
