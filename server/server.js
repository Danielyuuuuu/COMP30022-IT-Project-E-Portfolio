require("dotenv").config();

// Load dependencies
const express = require("express");
const router = require("./routes/main");
const path = require("path");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Start express
const app = express();

// Passport config
require("./config/passport")(passport);

// Connect Database
require("./models/db");

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express body middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.flash_success = req.flash("flash_success");
  res.locals.flash_fail = req.flash("flash_fail");
  res.locals.error = req.flash("error");
  next();
});

// Allow cors
app.use(cors({ origin: true, credentials: true }));

// Setup middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Setup routes
app.use("/", router);

// server static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static('client/build'));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}


// Server listener
app.listen((port = process.env.PORT || 8000), () =>
  console.log(`Server running on port ${port}`)
);

//test