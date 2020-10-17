const mongoose = require("mongoose");

const statisticSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  mediaNumber:{
    type: Number,
    default: 0,
    required: true,
  },
  blogNumber: {
    type: Number,
    default: 0,
    required: true,
  },
  storeNumber: {
    type: Number,
    default: 0,
    required: true,
  },
  messageNumber: {
    type: Number,
    default:0,
    required: true,
  },

  viewsNumber: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = Statistic = mongoose.model("Statistic", statisticSchema);
