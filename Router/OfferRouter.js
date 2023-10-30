const express = require("express");

const router = express.Router();

const OfferController = require("../Controllers/offerController");

router
  .route("/")
  .post(OfferController.CreatOffer)
  .get(OfferController.GetAllOffers);

router
  .route("/:id")
  .get(OfferController.GetOfferById)
  .delete(OfferController.DeletOffer);

  router
  .route("/branch/:branchId").get(OfferController.GetOfferByBranchId)
module.exports = router;
