const express = require("express");
const mongoose = require("mongoose");
const Item = require("../models/item");
const mongo_url = require("../models/db").mongo_url;

const connect = mongoose.createConnection(mongo_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

let gfs;
connect.once("open", () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads" // must be identical to the GridFsStorage bucketName in db.js
  });
});

const getItems = async (req, res) => {
  Item.find()
    .then((wares) => {
      res.status(200).json({
        success: true,
        item: wares
      });
    })
    .catch((err) => res.status(400).json({ nowaresfound: "No items found" }));
};

const addItem = async (req, res) => {
  console.log(req.body);
  try {
    const ware = new Item({
      itemname: req.body.name,
      description: req.body.description,
      imagename: req.file.filename,
      imageId: req.file.id,
      price: req.body.price,
      tag: req.body.tag,
      views: 0
    });
    ware
      .save()
      .then((ware) => {
        res.status(200).json({
          success: true,
          ware
        });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteItem = async (req, res) => {
  Item.findOne({ _id: req.params.id })
    .then((ware) => {
      if (ware) {
        // delete the ware in item model
        Item.deleteOne({ _id: req.params.id })
          .then(() => {
            // return res.status(200).json({
            //   success: true,
            //   message: `Item with ID: ${req.params.id} deleted`,
            // });
          })
          .catch((err) => {
            return res.status(400).json(err);
          });

        // delete the image file in gridfs
        gfs.delete(new mongoose.Types.ObjectId(ware.imageId), (err, data) => {
          if (err) {
            return res.status(404).json({ err: err });
          }

          res.status(200).json({
            success: true,
            message: `File with ID ${req.params.id} is deleted`
          });
        });
      }
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

const renderImg = async (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No files available"
      });
    }
    if (
      files[0].contentType === "image/jpg" ||
      files[0].contentType === "image/jpeg" ||
      files[0].contentType === "image/png" ||
      files[0].contentType === "image/svg+xml"
    ) {
      // render image to browser
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
};

// currently only work when req.body is in x-www-form-uelencoded format
// rather than form-data like post new item.
// maybe solved when implement react side, not sure ...
const updateItem = async (req, res) => {
  console.log(req.body);
  Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((item) => res.json({ msg: "Updated successfully" }))
    .catch((err) => res.status(400).json(err));
};

const updateViews = async (req, res) => {
  Item.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })
    .then(() => res.json({ msg: "Increment viewer count by 1" }))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  getItems,
  addItem,
  deleteItem,
  renderImg,
  updateItem,
  updateViews
};
