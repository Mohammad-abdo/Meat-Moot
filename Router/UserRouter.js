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

router.route("/updatePassword").patch(AuthController.protect,AuthController.updatePassword);
router.route("/updateMe").patch(AuthController.protect,UsersController.updateMe);

router.route("/deleteUser/:id").delete(AuthController.protect,AuthController.restrictTo("admin"),UsersController.DeleteUser);
router.route("/deleteMe").delete(UsersController.deleteMe);
router.route("/deactivateUser/:id").delete(UsersController.deactivateUser);

module.exports = router;
