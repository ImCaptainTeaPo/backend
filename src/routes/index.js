const router = require("express").Router();
const usersRouter = require("./users");
const booksRouter = require("./books");

router.use("/users", usersRouter);
router.use("/books", booksRouter);

module.exports = router;
