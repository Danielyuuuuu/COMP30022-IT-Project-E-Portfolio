const express = require("express");
const blogRouter = express.Router();
const auth = require("../config/auth");
const blogController = require("../controllers/blog");

// @route POST blog/uploadBlog
// @description Upload blog post
// @access Public
blogRouter.post("/uploadBlog", blogController.postBlog);

// @route GET blog/getSingleBlog
// @description Get one specific blog post
// @access Public
blogRouter.get("/getSingleBlog/:id", blogController.getSingleBlog);

// @route GET blog/getAllBlogs
// @description Get every blog posts
// @access Public
blogRouter.get("/getAllBlogs", blogController.getAllBlogs);

// @route DELETE blog/deletepost
// @description Delete the blog post
// @access Public
blogRouter.delete("/deleteBlog/:id", blogController.postDeleteBlog);

// @route POST blog/editBlog
// @description Edit blog post
// @access Public
blogRouter.post("/editBlog", blogController.postEditBlog);

module.exports = blogRouter;
