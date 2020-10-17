const express = require("express");
const statisticRouter = express.Router();
const statisticController = require("../controllers/statistic");


setInterval(statisticController.updateStatistic, 1000*60*60);

// upload middleware
const upload = require("../models/db").upload;

// @route       GET store/
// @description get all store items
// @access      Public
statisticRouter.get("/", statisticController.getStatistic);

statisticRouter.get("/update", statisticController.updateStatistic);

statisticRouter.get("/addView", statisticController.updateViews);

module.exports = statisticRouter;
