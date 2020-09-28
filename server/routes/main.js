/**
 * The main file document all the api routes for the website.
 */
const express = require("express");
const router = express.Router();

const bookRouter = require("./book");
const uploadRouter = require("./upload");

const paypalRouter = require("./paypal");
const userRouter = require("./user");
const storeRouter = require("./store");

const commentRouter = require("./comments");
const blogRouter = require("./blog");

// demo
router.use("/books", bookRouter);

// User login route
router.use("/user", userRouter);

// Uplaod route
router.use("/uploadManage", uploadRouter);
router.use("/paypal", paypalRouter);
router.use("/comments",commentRouter);

// Store route
router.use("/store", storeRouter);


// Blog route
router.use("/blog", blogRouter);


module.exports = router;
