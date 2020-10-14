const express = require("express");
const userRouter = express.Router();
const auth = require("../config/auth");
const userController = require("../controllers/user");

// @route POST user/register
// @description Handle User Register
// @access Public
userRouter.post("/register", userController.postUserRegister);

// @route POST user/login
// @description Handle User Login
// @access Public
userRouter.post("/login", userController.postUserLogin);

// Handle Logout
// @route GET user/login
// @description Handle User Logout
// @access Public
userRouter.get("/logout", userController.getUserLogout);

// @route GET user
// @description Get the user name and id
// @access Public
userRouter.get("/", auth, userController.getUserLoginRegister);

// @route POST user/tokenIsValid
// @description Check if the user token is valid
// @access Public
userRouter.post("/tokenIsValid", userController.postTokenIsValid);

// @route POST user/getUserEmail
// @description Check if the user token is valid
// @access Public
userRouter.post("/getUserEmail", userController.postFindEmailUsingToken);

// @route POST user/changePassword
// @description Check if the user token is valid
// @access Public
userRouter.post("/changePassword", userController.postChangePassword);

module.exports = userRouter;
