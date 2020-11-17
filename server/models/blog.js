const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
  thumbnails: {
    imagename: {
      type: String,
      required: true,
    },
  },

  upload_date: {
    type: Date,
    default: Date.now,
  },
  // store the id of each comments(/comments block)
  // reference to the Comment Schema
  commentblock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  hashtags: [
    {
      type: String,
    },
  ],
});

module.exports = Blog = mongoose.model("Blog", blogSchema);
