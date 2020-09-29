const express = require("express");
const galleryRouter = express.Router();
const galleryController = require("../controllers/gallery");

// @route       GET gallery/
// @description get all gallery items
// @access      Public
galleryRouter.get("/", galleryController.getAllArtworks);

// @route       POST gallery/
// @description add a new gallery artwork
// @access      Private
galleryRouter.post("/", galleryController.addArtwork);

// @route       PUT gallery/:id
// @description given the artwork._id,
//              update the artwork information,
//              mainly moving the artwork from one category to another category
// @access      Private
galleryRouter.put("/:id", galleryController.updateArtwork);

// @route       get gallery/:category
// @description given the category passed in url
//              get all artworks under the same category
// @access      Public
galleryRouter.get("/:category", galleryController.getArtworksUnderCat);

// @route       POST gallery/:subcategory
// @description given the subcategory and category passed in frondend http request body
//              get all artworks under the same sub-category and category
// @access      Public
// galleryRouter.post("/:subcategory", galleryController.getArtworksUnderSubcat);

// @route       Delete gallery/:id
// @description given the artwork._id,
//              delete an artwork entry in gallery (the image remains in Media)
// @access      Private
galleryRouter.delete("/:id", galleryController.deleteArtwork);


module.exports = galleryRouter;
