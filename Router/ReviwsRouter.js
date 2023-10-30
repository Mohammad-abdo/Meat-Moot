const express = require('express');
const router = express.Router();
const ReviwController = require("../Controllers/ReviwController")

router.route('/')
.post(ReviwController.saveReviw)
.get(ReviwController.getAllReviwes)
router.route('/user/:userId')
.get(ReviwController.getReviwesByUserId)
router.route('/:id')
.get(ReviwController.getReviwesById)
.put(ReviwController.updateReviwesById)
.delete(ReviwController.deleteReviwesById)

module.exports = router