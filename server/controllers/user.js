const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User model
const User = require("../models/User");

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

    const user = await User.findOne({ email: email }).exec();
    if (user !== null) {
      return res.status(400).json({ msg: "User Already Exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password1, salt);

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json({ msg: "Successfully registered" });
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

    const user = await User.findOne({ email: email }).exec();
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
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

// Get the user name and id
const getUserLoginRegister = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    name: user.name,
    id: user._id,
  });
};

// Check if the user token is valid
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

const postFindEmailUsingToken = async (req, res) => {
  try {
    let {token} = req.body;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("From back end: " + token);

    if (!token) return res.status(400).json({msg: "Need to send user token"});

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(400).json({msg: "Token not verified"});

    const user = await User.findById(verified.id);
    if (!user) return res.status(400).json({msg: "No such user"});

    return res.status(200).json({email: user.email});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Change user password
const postChangePassword = async (req, res) => {
  try {
    let { email, newPassword, repeatNewPassword } = req.body;
    if (!email || !newPassword || !repeatNewPassword) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (newPassword != repeatNewPassword) {
      return res.status(400).json({ msg: "Please enter the same password" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    const savedPassword = await User.findOneAndUpdate(
      {
        email: email,
      },
      { password: passwordHash }
    );

    return res.json(savedPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postUserRegister,
  postUserLogin,
  getUserLogout,
  getUserLoginRegister,
  postTokenIsValid,
  postChangePassword,
  postFindEmailUsingToken,
};
