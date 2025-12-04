const Book = require("../models/book");

// GET /books
const getBooks = (req, res, next) => {
  Book.find({})
    .then((books) => res.status(200).json(books))
    .catch(next);
};

// GET /books/:book_id
const getBook = (req, res, next) => {
  const { book_id } = req.params;

  Book.findById(book_id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Книга не найдена" });
      }
      return res.status(200).json(book);
    })
    .catch(next);
};

// POST /books
const createBook = (req, res, next) => {
  const data = req.body;

  Book.create(data)
    .then((book) => res.status(201).json(book))
    .catch(next);
};

// PATCH /books/:book_id
const updateBook = (req, res, next) => {
  const { book_id } = req.params;
  const data = req.body;

  Book.findByIdAndUpdate(book_id, data, { new: true, runValidators: true })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Книга не найдена" });
      }
      return res.status(200).json(book);
    })
    .catch(next);
};

// DELETE /books/:book_id
const deleteBook = (req, res, next) => {
  const { book_id } = req.params;

  Book.findByIdAndDelete(book_id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Книга не найдена" });
      }
      return res.status(200).json({ message: "Книга удалена" });
    })
    .catch(next);
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
