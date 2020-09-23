const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/store");

// upload middleware
const upload = require('../models/db').upload;


// @route       GET store/
// @description get all store items
// @access      Public
storeRouter.get("/", storeController.getItems);

// @route       POST store/
// @description add a new store item
// @access      Private
storeRouter.post("/", upload.single("file"), storeController.addItem);

// @route       GET store/filter
// @description get specific store items with matching categories
// @access      Public
storeRouter.post("/filter", storeController.getSpecificItems);

// @route       Delete store/delete/:id
// @description given the item._id,
//              delete a store item and the correspond gridfs file(image)
// @access      Private
storeRouter.delete("/delete/:id", storeController.deleteItem);

// @route       Get store/image/:fileid
// @description given the item.imageid (filename in storeitems.files),
//              fetch a particular image and render on browser
// @access      Public
storeRouter.get("/image/:filename", storeController.renderImg);

// @route       PUT store/update/:id
// @description given the item._id,
//              update the item information
// @access      Private
storeRouter.put("/update/:id", storeController.updateItem);

// @route       UPDATE store/update/:id/views
// @description given the item._id,
//              update the viewer count of the items
// @access      Private
storeRouter.put("/update/:id/views", storeController.updateViews);

module.exports = storeRouter;
