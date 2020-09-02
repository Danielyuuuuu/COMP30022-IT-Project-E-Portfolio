const express = require("express");
const userRouter = express.Router();

// Login
userRouter.get("/login", (req, res) => {
  res.render("login");
});

// Register
userRouter.get("/register", (req, res) => {
  res.render("register");
});

module.exports = userRouter;
