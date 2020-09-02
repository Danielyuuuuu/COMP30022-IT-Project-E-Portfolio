/**
 * The main file document all the api routes for the website.
 */
const express = require("express");
const router = express.Router();

const bookRouter = require("./book");

router.use("/books", bookRouter);

router.use("/user", require("./user"));

router.use("/", require("./index"));

module.exports = router;
