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
  imagenames:[],
});

module.exports = Artwork = mongoose.model("Artwork", artworkSchema);
