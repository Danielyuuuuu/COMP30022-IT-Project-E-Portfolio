const mongoose = require("mongoose");

const artworkSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  // the imagename corresponds to the filename in uploads.files
  images:[{
    imagename: {
      type: String,
      required: true,
    },
    upload_date: {
      type: Date,
      default: Date.now,
    }
  }],
});

module.exports = Artwork = mongoose.model("Artwork", artworkSchema);
