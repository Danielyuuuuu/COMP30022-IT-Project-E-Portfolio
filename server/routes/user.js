const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

// User model
const User = require("../models/User");
const router = require(".");

// Login Page
userRouter.get("/login", (req, res) => {
  res.render("login");
});

// Register Page
userRouter.get("/register", (req, res) => {
  res.render("register");
});

// Handle Register
userRouter.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errorMessages = [];

  // Check if all of the fields are filled
  if (!name || !email || !password || !password2) {
    errorMessages.push({ msg: "All fields are required" });
  }
  // Check if both passwords match
  if (password !== password2) {
    errorMessages.push({ msg: "Passwords do not match" });
  }

  // Check if there is any errors been detected
  if (errorMessages.length > 0) {
    res.render("register", {
      errorMessages,
      name,
      email,
      password,
      password2,
    });
  }
  // No errors
  else {
    User.findOne({ email: email }).then((user) => {
      // Email address already exist
      if (user) {
        errorMessages.push({ msg: "Email address is already registered" });
        res.render("register", {
          errorMessages,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // Hash the password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            // Store the hashed password
            newUser.password = hash;
            // Save the user
            newUser
              .save()
              .then((user) => {
                req.flash("flash_success", "You have registered successfully");
                res.redirect("/user/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

// Handle Login
userRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = userRouter;
