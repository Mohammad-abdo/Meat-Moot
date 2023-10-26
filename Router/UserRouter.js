const express = require("express");
const router = express.Router();
const UsersController = require("../Controllers/UsersController");
const AuthController = require("../Controllers/authController");
router.route("/").get(UsersController.getAllUser);

router.route("/updateMe/:id").patch(UsersController.updateMe);

router.route("/login").post(AuthController.signin);

router.route("/signup").post(AuthController.SaveUser);

router.route("/forgetPassword").post(AuthController.forgetPassword);

router.route("/resetPassword/:token").patch(AuthController.resetPassword);

router.route("/updatePassword/:id").patch(AuthController.updatePassword);

router.route("/deleteUser/:id").delete(UsersController.DeleteUser);

 

module.exports = router;
