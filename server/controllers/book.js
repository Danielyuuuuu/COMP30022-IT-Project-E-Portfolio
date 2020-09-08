const Book = require("../models/book");

const getBooks = async (req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(404).json({ nobooksfound: "No Books found" }));
};

const getBook = async (req, res) => {
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(404).json({ nobookfound: "No Book found" }));
};

// const addBook = async (req, res) => {
//   Book.create(req.body)
//     .then((book) => res.json({ msg: "Book added successfully" }))
//     .catch((err) => res.status(400).json({ error: "Unable to add this book" }));
// };

const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send({
      book: book.toObject(),
    });
  } catch (error) {
    res.status(400).send({
      error: 'An error has occured',
    });
  }
};

const updateBook = async (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
};

const deleteBook = async (req, res) => {
  Book.findByIdAndRemove(req.params.id, req.body)
    .then((book) => res.json({ mgs: "Book entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a book" }));
};

const create = async (book) => {
  if (!book) throw new Error('Missing book');
  await Book.create(book);
}

module.exports = {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  create
};
