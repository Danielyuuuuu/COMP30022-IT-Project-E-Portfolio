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

statisticRouter.post("/update", statisticController.updateStatistic);

statisticRouter.post("/addView", statisticController.updateViews);

module.exports = statisticRouter;
