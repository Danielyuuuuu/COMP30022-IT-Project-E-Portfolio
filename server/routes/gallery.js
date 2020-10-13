const express = require("express");
const galleryRouter = express.Router();
const galleryController = require("../controllers/gallery");

// @route       GET gallery/
// @description get all gallery items
// @access      Public
galleryRouter.get("/", galleryController.getAllArtworks);

// @route       POST gallery/
// @description add one or more artwork(s) in the subcategory
// @access      Private
galleryRouter.post("/", galleryController.updateArtwork);

// @route       PUT gallery/:id
// @description given the artwork._id,
//              update the artwork information,
//              mainly moving the artwork from one category to another category
// @access      Private
// galleryRouter.put("/:id", galleryController.updateArtwork);

// @route       POST gallery/category
// @description given the category passed in url
//              get all artworks under the same category
// @access      Public
galleryRouter.post("/category", galleryController.getArtworksUnderCat);

// @route       POST gallery/subcategory
// @description given the subcategory and category passed in frondend http request body
//              get all artworks under the same sub-category and category
// @access      Public
galleryRouter.post("/subcategory", galleryController.getArtworksUnderSubcat);

// @route       DELETE gallery/subcategory
// @description given the artwork._id,
//              delete an artwork entry in gallery (the image remains in Media)
// @access      Private
// galleryRouter.delete("/subcategory", galleryController.deleteArtwork);


module.exports = galleryRouter;
