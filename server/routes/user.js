const express = require("express");
const userRouter = express.Router();
const auth = require("../config/auth");
const userController = require("../controllers/user");

// @route GET user/login
// @description User Login Page
// @access Public
userRouter.get("/login", userController.getUserLogin);

// @route GET user/register
// @description User Register Page
// @access Public
userRouter.get("/register", userController.getUserRegister);

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
// @description User Login or Register Home Page
// @access Public
userRouter.get("/", auth, userController.getUserLoginRegister);

// @route GET use/dashboard
// @description Access User Dashboard
// @access Private
userRouter.get("/dashboard", auth, userController.getUserDashboard);

userRouter.post("/tokenIsValid", userController.postTokenIsValid);

module.exports = userRouter;
