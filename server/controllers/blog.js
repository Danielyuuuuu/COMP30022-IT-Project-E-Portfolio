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

    // Save the blog post
    const savedPost = newPost.save();
    res.json(savedPost);
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
const getAllBlogs = async (req, res) => {
  BlogModel.find({}).then((blogs) => {
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        err: "No blog found",
      });
    }

    return res.json(blogs);
  });
};

// delete the file
const postDeleteBlog = async (req, res) => {
  BlogModel.remove({ _id: req.params.id }, (err, obj) => {
    if (err) {
      return res.status(404).json({ err: "Can not find such blog" });
    }
    return res.json({ msg: "Post deleted" });
  });
};

const postEditBlog = async (req, res) => {
  try {
    let { postID, postTitle, imageUrl, postBody, hashTags } = req.body;
    if (!postID || !postTitle || !imageUrl || !postBody || !hashTags) {
      return res.status(400).json({
        msg:
          "Require all of the fields, which includes postID, postTitle, imageUrl, postBody and hashTags",
      });
    }
    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: postID },
      {
        title: postTitle,
        content: postBody,
        thumbnails: { imagename: imageUrl },
        hashtags: hashTags,
      }
    );
    return res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAboutMe = async (req, res) => {
  BlogModel.findOne({ title: "About Me" }).then((blogFile) => {
    if (!blogFile) {
      return res.status(400).json({ msg: "No about me blog" });
    }
    return res.json(blogFile);
  });
}

module.exports = {
  postBlog,
  getSingleBlog,
  getAllBlogs,
  postDeleteBlog,
  postEditBlog,
  getAboutMe,
};
