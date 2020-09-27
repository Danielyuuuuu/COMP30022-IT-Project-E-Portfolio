const express = require("express");
const mongoose = require("mongoose");
const Item = require("../models/item");

// Blog Model
const BlogModel = require("../models/blog");

const postBlog = async (req, res) => {
  try {
    let { postTitle, imageUrl, postBody, hashTags } = req.body;
    if (!postTitle || !imageUrl || !postBody) {
      return res.status(400).json({ msg: "Need to fill in all fields" });
    }

    const newPost = new BlogModel({
      title: postTitle,
      content: postBody,
      thumbnails: { imagename: imageUrl },
      hashtags: hashTags,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single blog
const getSingleBlog = async (req, res) => {
  BlogModel.findOne({ _id: req.params.id }).then((blogFile) => {
    if (!blogFile) {
      return res.status(400).json({ msg: "No such blog" });
    }
    return res.json(blogFile);
  });
};

// Get all blogs
const getAllFiles = async (req, res) => {
  BlogModel.find().toArray((err, blogs) => {
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        err: "No blog found",
      });
    }

    return res.json(files);
  });
};

// delete the file
const postDeleteBlog = async (req, res) => {
  BlogModel.remove({ _id: req.params.id }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: "Can not find such blog" });
    }
  });
};

module.exports = { postBlog, getSingleBlog, getAllFiles, postDeleteBlog };