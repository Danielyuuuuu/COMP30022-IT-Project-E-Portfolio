const mongoose = require("mongoose");

const ContactMeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ContactMe = mongoose.model("ContactMe", ContactMeSchema);

module.exports = ContactMe;
