const express = require("express");
const commentRouter = express.Router();

const commentController = require("../controllers/comments");

commentRouter.get("/", commentController.getComments);

commentRouter.get("/blog/:id", commentController.getBlogComments);

commentRouter.get("/:id", commentController.getSingleComment);

commentRouter.post("/add", commentController.addComment);

commentRouter.delete("/:id", commentController.deleteComment);

commentRouter.post("/addLike", commentController.postAddLike);

module.exports = commentRouter;
