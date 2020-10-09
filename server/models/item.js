const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  itemname: {
    type: String,
  },
  description: {
    type: String,
  },
  // image : {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'GridFs',
  //     required: true,
  // },
  // the imagename corresponds to the filename in uploads.files
  imagename: {
    type: String,
    required: true,
  },
  stocks: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  upload_date: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = Item = mongoose.model("Item", itemSchema);
