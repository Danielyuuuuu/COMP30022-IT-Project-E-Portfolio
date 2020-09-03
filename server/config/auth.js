module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash("error", "Please login via this login page");
    res.redirect("/user/login");
  },
};
