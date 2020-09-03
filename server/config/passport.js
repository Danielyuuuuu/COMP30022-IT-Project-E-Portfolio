const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Get User Model
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Find user in database
      User.findOne({ email: email })
        .then((user) => {
          // Can't find the user email address
          if (!user) {
            return done(null, false, {
              message: "Email address not registered",
            });
          }

          // Verify the password
          bcrypt.compare(password, user.password, (err, success) => {
            if (err) throw err;

            // Password matched
            if (success) {
              return done(null, user);
            }
            // Password do not match
            else {
              return done(null, false, { message: "Incorrect password" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
