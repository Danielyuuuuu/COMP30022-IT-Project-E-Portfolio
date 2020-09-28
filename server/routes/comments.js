const express = require("express");
const commentRouter = express.Router();

const commentController = require("../controllers/comments");

commentRouter.get('/' ,commentController.getComments);

commentRouter.get('/' ,commentController.getBlogComments);

commentRouter.get('/:id', commentController.getSingleComment);

commentRouter.post('/add', commentController.addComment);

commentRouter.post('/:id', commentController.deleteComment);

module.exports = commentRouter;