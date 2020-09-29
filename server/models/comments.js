const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blog",
  },
  publisher: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  favours: {
    type: Number,
    default: 0,
  },
  photo: {
    type: String,
    default: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
