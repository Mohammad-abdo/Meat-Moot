const express = require('express')
const router = express.Router()
const  BranchController=require('../Controllers/BranchController')

router.route('/')
  .get(BranchController.getAllBranch)
  .post(BranchController.saveBranch)
router.route('/:id')
   .patch(BranchController.updateBranch)
   .get(BranchController.getBranch)
   .delete(BranchController.deleteBranch)

   router.route('/offer/:offerId').get(BranchController.GettAllBranchOffers)

module.exports = router