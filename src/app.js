const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const corsMiddleware = require("./middlewares/cors");
const loggerMiddleware = require("./middlewares/logger");
const errorMiddleware = require("./middlewares/error");
const routes = require("./routes");

dotenv.config();

const { PORT = 3005, API_URL = "http://127.0.0.1", MONGO_URL } = process.env;

const app = express();

// Парсим JSON в запросах
app.use(express.json());

// CORS
app.use(corsMiddleware);

// Логгер
app.use(loggerMiddleware);

// Роуты
app.use("/", routes);

// 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Ресурс не найден" });
});

// Глобальный обработчик ошибок (500)
app.use(errorMiddleware);

// Подключение к Mongo и запуск сервера
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at ${API_URL}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
  });
