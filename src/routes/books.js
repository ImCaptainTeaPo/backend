const router = require("express").Router();

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");

// /books
router.get("/", getBooks); // получить все книги
router.post("/", createBook); // создать книгу
router.get("/:book_id", getBook); // получить книгу по id

// ОБНОВЛЕНИЕ КНИГИ
router.put("/:book_id", updateBook); // полное обновление (PUT)
router.patch("/:book_id", updateBook); // частичное обновление (PATCH)

router.delete("/:book_id", deleteBook); // удалить книгу по id

module.exports = router;
