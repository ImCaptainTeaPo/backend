const User = require("../models/user");

// GET /users — список всех
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch(next);
};

// GET /users/:user_id
const getUser = (req, res, next) => {
  const { user_id } = req.params;

  User.findById(user_id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      return res.status(200).json(user);
    })
    .catch(next);
};

// POST /users — создание
const createUser = (req, res, next) => {
  const data = req.body;

  User.create(data)
    .then((user) => res.status(201).json(user))
    .catch(next);
};

// PATCH /users/:user_id — обновление
const updateUser = (req, res, next) => {
  const { user_id } = req.params;
  const data = req.body;

  User.findByIdAndUpdate(user_id, data, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      return res.status(200).json(user);
    })
    .catch(next);
};

// DELETE /users/:user_id — удаление
const deleteUser = (req, res, next) => {
  const { user_id } = req.params;

  User.findByIdAndDelete(user_id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      return res.status(200).json({ message: "Пользователь удалён" });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
