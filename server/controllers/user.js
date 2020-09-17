const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// User model
const User = require("../models/User");

// Login Page
const getUserLogin = async (req, res) => {
  res.render("login");
};

// Register Page
const getUserRegister = async (req, res) => {
  res.render("register");
};

// Handle Register
const postUserRegister = async (req, res) => {
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
        res.send("User Already Exists");
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
};

// Handle Login
const postUserLogin = async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "http://localhost:3000/admin/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
};

// Handle Logout
const getUserLogout = async (req, res) => {
  req.logOut();
  req.flash("flash_success", "Logged out successfully");
  res.redirect("/user/login");
};

// User Login or Register page
const getUserLoginRegister = async (req, res) => {
  res.render("welcome");
};

// User dashboard
const getUserDashboard = async (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
};

module.exports = {
  getUserLogin,
  getUserRegister,
  postUserRegister,
  postUserLogin,
  getUserLogout,
  getUserLoginRegister,
  getUserDashboard,
};
