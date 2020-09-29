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

const addArtwork = async (req, res) => {
  console.log(req.body);
  try {
    const artwork = new Artwork({
      category: req.body.category,
      subcategory: req.body.subcategory,
      imagename: req.body.filename,
    });
    artwork
      .save()
      .then((artwork) => {
        res.status(200).json({
          success: true,
          artwork
        });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(400).json(error);
  }
}


const updateArtwork = async (req, res) => {
  console.log(req.body);
  Artwork.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then((artwork) => res.json({ msg: "Updated successfully" }))
    .catch((err) => res.status(400).json(err));
};

const getArtworksUnderCat = async (req, res) => {
  var target_category = req.params.category;
  Artwork.find({ category: target_category })
    .then((artworks) => {
      res.status(200).json({
        success: true,
        artworks: artworks,
      });
    })
    .catch((err) => res.status(400).json(err));
};

// const getArtworksUnderSubcat = async (req, res) => {
//   var target_subcategory = req.params.subcategory;
//   Artwork.find({ subcategory: target_category })
//     .then((artworks) => {
//       res.status(200).json({
//         success: true,
//         artworks: artworks,
//       });
//     })
//     .catch((err) => res.status(400).json(err));
// };

const deleteArtwork = async (req, res) => {
  Artwork.findOne({ _id: req.params.id })
    .then((artwork) => {
      if (artwork) {
        // delete the ware in item model
        Artwork.deleteOne({ _id: req.params.id })
          .then(() => {
            // return res.status(200).json({
            //   success: true,
            //   message: `Item with ID: ${req.params.id} deleted`,
            // });
          })
          .catch((err) => {
            return res.status(400).json(err);
          });

          res.status(200).json({
            success: true,
            message: `Artwork with ID ${req.params.id} is deleted`
          });
        });
      }
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = {
  getAllArtworks,
  addArtwork,
  updateArtwork,
  getArtworksUnderCat,
  deleteArtwork,
};
