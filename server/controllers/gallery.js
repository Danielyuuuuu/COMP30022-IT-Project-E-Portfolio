const express = require("express");
const mongoose = require("mongoose");
const Artwork = require("../models/artwork");
const mongo_url = require("../models/db").mongo_url;

const getAllArtworks = async (req, res) => {
  Artwork.find()
    .then((artworks) => {
      res.status(200).json({
        artworks: artworks
      });
    })
    .catch((err) => res.status(400).json({ noartworksfound: "No artworks found" }));
};

// since now each artwork object contains an array of images as artworks fall under
// the same subcategory. Adding a new artwork is basically updating the images array.
// E.g. req body:
// {
//   "category": "cat1",
//   "subcategory": "subcat1",
//   "images": ["pic1","pic2"]
// }
const addArtwork = async (req, res) => {
  console.log(req.body);
  const query = { 'category': req.body.category, 'subcategory': req.body.subcategory };
  const update = { '$addToSet': { 'imagenames': { '$each': req.body.images } }};
  try{
    // upsert is true, so if the category or subcat is not found, it will
    // automatically create a new entry.
    Artwork.findOneAndUpdate(query, update, {upsert:true}, (err, doc) => {
      if (err) return res.status(400).json(err);
      res.send("Added successfully");
    })
  } catch (error) {
    res.status(400).json(error);
  }
}


// const updateArtwork = async (req, res) => {
//   console.log(req.body);
//   Artwork.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//     .then((artwork) => res.json({ msg: "Updated successfully" }))
//     .catch((err) => res.status(400).json(err));
// };

const getArtworksUnderCat = async (req, res) => {
  const target_category = req.body.category;
  Artwork.find({ category: target_category })
    .then((artworks) => {
      res.status(200).json({
        success: true,
        artworks: artworks,
      });
    })
    .catch((err) => res.status(400).json(err));
};

const getArtworksUnderSubcat = async (req, res) => {
  const current_category = req.body.category;
  const target_subcategory = req.body.subcategory;
  Artwork.find({ category: current_category, subcategory: target_subcategory })
    .then((artworks) => {
      res.status(200).json({
        success: true,
        artworks: artworks,
      });
    })
    .catch((err) => res.status(400).json(err));
};

// now allow removal of multiple artworks under the same subcategory.
// const deleteArtwork = async (req, res) => {
//   Artwork.findOne({ _id: req.params.id })
//     .then((artwork) => {
//       if (artwork) {
//         Artwork.deleteOne({ _id: req.params.id })
//           .then(() => {
//             return res.status(200).json({
//               success: true,
//               message: `Artwork with ID: ${req.params.id} deleted`
//             });
//           })
//           .catch((err) => {
//             return res.status(400).json(err);
//           });
//       } else {
//         res.status(400).json({
//           success: false,
//           message: "Artwork not found"
//         });
//       }
//     })
//     .catch((err) => {
//       return res.status(400).json(err);
//     });
// };

// since now each artwork object contains an array of images as artworks fall under
// the same subcategory. Remove any artworks is basically updating the images array.
// E.g. req body:
// {
//   "category": "cat1",
//   "subcategory": "subcat1",
//   "images": ["pic1","pic2"]
// }
// The above will remove pic1, pic2 from cat1/subcat1.
const deleteArtwork = async (req, res) => {
  console.log(req.body);
  const query = { 'category': req.body.category, 'subcategory': req.body.subcategory };
  const update = { '$pull': { 'imagenames': { '$in': req.body.images } } };
  try{
    // upsert is true, so if the category or subcat is not found, it will
    // automatically create a new entry.
    Artwork.findOneAndUpdate(query, update, (err, doc) => {
      if (err) return res.status(400).json(err);
      res.send("Removed successfully");
    })
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  getAllArtworks,
  addArtwork,
  getArtworksUnderCat,
  getArtworksUnderSubcat,
  deleteArtwork,
};
