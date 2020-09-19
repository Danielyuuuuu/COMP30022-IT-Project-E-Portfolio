const bcrypt = require("bcryptjs");
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
  try {
    let { name, email, password1, password2 } = req.body;

    // Check if all of the fields are filled
    if (!name || !email || !password1 || !password2) {
      return res.status(400).json({ msg: "Need to fill in all fields" });
    }
    // Check if both passwords match
    if (password1 !== password2) {
      return res.status(400).json({ msg: "Please enter the same password" });
    }

    User.findOne({ email: email }).then((user) => {
      // Email address already exist
      if (user) {
        return res.status(400).json({ msg: "User Already Exists" });
      }

      // const salt = bcrypt.genSalt();
      // const passwordHash = bcrypt.hash(password1, salt);

      // const newUser = new User({
      //   name,
      //   email,
      //   password: passwordHash,
      // });

      // const savedUser = newUser.save();
      // res.json(savedUser);

      // Hash the password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(password1, salt, (err, hash) => {
          if (err) throw err;

          // Store the hashed password
          const newUser = new User({
            name,
            email,
            password: hash,
          });
          // newUser.password = hash;

          // Save the user
          const savedUser = newUser.save();
          res.json(savedUser);
        })
      );
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handle Login
const postUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        name: user.name,
        id: user._id,
      },
    });
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
};

// Handle Logout
const getUserLogout = async (req, res) => {
  req.logOut();
  req.flash("flash_success", "Logged out successfully");
  res.redirect("/user/login");
};

// User Login or Register page
const getUserLoginRegister = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    name: user.name,
    id: user._id,
  });
};

// User dashboard
const getUserDashboard = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    name: user.name,
    id: user._id,
  });
};

const postTokenIsValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserLogin,
  getUserRegister,
  postUserRegister,
  postUserLogin,
  getUserLogout,
  getUserLoginRegister,
  getUserDashboard,
  postTokenIsValid,
};
