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
  // the imageId corresponds to the ObjectId in uploads.files
  imageId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
  },
  upload_date: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
  },
});

module.exports = Item = mongoose.model("Item", itemSchema);
