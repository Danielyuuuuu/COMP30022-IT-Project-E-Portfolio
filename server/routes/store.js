const express = require("express");
const storeRouter = express.Router();
// upload middleware
const uploadStore = require("../models/db").uploadStore;

const storeController = require("../controllers/store");

// @route       GET store/
// @description get all store items
// @access      Public
storeRouter.get("/", storeController.getItems);

// @route       POST store/
// @description add a new store item
// @access      Public
storeRouter.post("/", uploadStore.single("file"), storeController.addItem);

// @route       Delete store/delete/:id
// @description given the item._id,
//              delete a store item and the correspond gridfs file(image)
// @access      Public
storeRouter.delete("/delete/:id", storeController.deleteItem);

// @route       Get store/image/:fileid
// @description given the item.imageid (filename in storeitems.files),
//              fetch a particular image and render on browser
// @access      Public
storeRouter.get("/image/:filename", storeController.renderImg);

// @route       UPDATE store/update/:id/views
// @description given the item._id,
//              update the viewer count of the items
// @access      Private
storeRouter.put("/update/:id/views", storeController.updateViews);

module.exports = storeRouter;
