const express = require("express");
const blogRouter = express.Router();
const auth = require("../config/auth");
const blogController = require("../controllers/blog");

// @route POST blog/uploadblog
// @description Upload blog post
// @access Public
blogRouter.post("/uploadblog", blogController.postBlog);

// @route GET blog/getsingleblog
// @description Get one specific blog post
// @access Public
blogRouter.get("/getsingleblog/:id", blogController.getSingleBlog);

// @route GET blog/getallblogs
// @description Get every blog posts
// @access Public
blogRouter.get("/getallblogs", blogController.getAllBlogs);

// @route DELETE blog/deletepost
// @description Delete the blog post
// @access Public
blogRouter.delete("/postDeleteBlog/:id", blogController.postDeleteBlog);

module.exports = blogRouter;
