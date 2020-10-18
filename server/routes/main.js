/**
 * The main file document all the api routes for the website.
 */
const express = require("express");
const router = express.Router();

const uploadRouter = require("./upload");

const paypalRouter = require("./paypal");
const userRouter = require("./user");
const storeRouter = require("./store");
const galleryRouter = require("./gallery");
const commentRouter = require("./comments");
const blogRouter = require("./blog");
const contactMeRouter = require("./contactMe");
const statisticRouter = require("./statistic")

// User login route
router.use("/user", userRouter);

// Uplaod route
router.use("/uploadManage", uploadRouter);
router.use("/paypal", paypalRouter);
router.use("/comments", commentRouter);

// Gallery route
router.use("/gallery", galleryRouter);

// Store route
router.use("/store", storeRouter);

// Blog route
router.use("/blog", blogRouter);

// Contact Me route
router.use("/contactMe", contactMeRouter);

// the statistic information route
router.use("/statistic", statisticRouter);

module.exports = router;
