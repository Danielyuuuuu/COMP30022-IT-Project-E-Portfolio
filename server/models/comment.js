const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
});

module.exports = Comment = mongoose.model("Comment", commentSchema);
