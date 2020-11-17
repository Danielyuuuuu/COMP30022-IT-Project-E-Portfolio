const express = require("express");
const commentRouter = express.Router();

const commentController = require("../controllers/comments");

// @route Get getComments
// @description Get all comments from db
// @access Public
commentRouter.get("/", commentController.getComments);

// @route Get getBlogComments
// @description Get all comments from corresponding blog
// @access Public
commentRouter.get("/blog/:id", commentController.getBlogComments);

// @route Get getSingleComment
// @description Get comment by its id
// @access Public
commentRouter.get("/:id", commentController.getSingleComment);

// @route Post addComment
// @description Post comment 
// @access Public
commentRouter.post("/add", commentController.addComment);

// @route DELETE deleteComment
// @description delete comment by its id
// @access Public
commentRouter.delete("/:id", commentController.deleteComment);

// @route POST postAddLike
// @description add favor to a comment
// @access Public
commentRouter.post("/addLike", commentController.postAddLike);

// @route POST postUnLike
// @description cancel the favor to a comment
// @access Public
commentRouter.post("/unLike", commentController.postUnLike);

module.exports = commentRouter;
