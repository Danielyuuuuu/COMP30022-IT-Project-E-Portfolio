/**
 * The main file document all the api routes for the website.
 */
const express = require("express");
const router = express.Router();

const bookRouter = require("./book");
const uploadRouter = require("./upload");
const paypalRouter = require("./paypal");

router.use("/books", bookRouter);


// User login route
router.use("/user", require("./user"));
router.use("/uploadManage", uploadRouter);
router.use("/paypal", paypalRouter);


module.exports = router;
