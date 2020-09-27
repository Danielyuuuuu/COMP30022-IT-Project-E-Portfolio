const express = require("express");
const commentRouter = express.Router();

const commentController = require("../controllers/comments");

commentRouter.get('/' ,commentController.getComments);

commentRouter.post('/add', commentController.addComment);

commentRouter.put('/update',commentController.putComment);

module.exports = commentRouter;