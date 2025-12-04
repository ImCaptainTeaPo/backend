const router = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

// /users
router.get("/", getUsers); // получить всех пользователей
router.post("/", createUser); // создать пользователя
router.get("/:user_id", getUser); // получить пользователя по id

// ОБНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
router.put("/:user_id", updateUser); // полное обновление (PUT)
router.patch("/:user_id", updateUser); // частичное обновление (PATCH)

router.delete("/:user_id", deleteUser); // удалить пользователя по id

module.exports = router;
