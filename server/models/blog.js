const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  }
  images: [{
    imagename: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    }
  }],
  upload_date: {
    type: Date,
    default: Date.now,
  },
  // store the id of each comments(/comments block)
  // reference to the Comment Schema
  commentblock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  // template for comments block
  // comments: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Comment',
  // }],
  hashtags: [{
    type: String,
  }],
});

module.exports = Blog = mongoose.model("Blog", blogSchema);