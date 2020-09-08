const express = require("express");
const bookRouter = express.Router();

const bookController = require("../controllers/book");

// @route GET books/test
// @description tests books route
// @access Public
bookRouter.get("/test", (req, res) => res.send("book route testing!"));

// @route GET books
// @description Get all books
// @access Public
bookRouter.get("/", bookController.getBooks);

// @route GET books/:id
// @description Get single book by id
// @access Public
bookRouter.get("/:id", bookController.getBook);

// @route GET books
// @description add/save book
// @access Public
bookRouter.post("/", bookController.addBook);

// @route GET books/:id
// @description Update book
// @access Public
bookRouter.put("/:id", bookController.updateBook);

// @route GET books/:id
// @description Delete book by id
// @access Public
bookRouter.delete("/:id", bookController.deleteBook);

module.exports = bookRouter;
