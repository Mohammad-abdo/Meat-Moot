const express =require('express')

const router= express.Router()

const MBranchControllers=require("../Controllers/MBranchControllers")


router.route("/").post(MBranchControllers.saveBranch)



module.exports=router