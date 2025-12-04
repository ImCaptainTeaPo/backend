const errorMiddleware = (err, req, res, next) => {
  console.error("Ошибка:", err);

  if (!res.headersSent) {
    res.status(500).json({ message: "На сервере произошла ошибка" });
  } else {
    next(err);
  }
};

module.exports = errorMiddleware;
