const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const login = require("./routes/loginRoutes");
const presentation = require("./routes/presentationRoutes");
const slide = require("./routes/slideRoutes");
const object = require("./routes/objectRoutes");
const animation = require("./routes/animationRoutes");

const config = require("./configs/appConfig");

const app = express();
mongoose.connect(config.database.uri);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors(config.cors));

app.use(config.routes.login, login);
app.use(config.routes.presentation, presentation);
app.use(config.routes.slide, slide);
app.use(config.routes.object, object);
app.use(config.routes.animation, animation);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  const isDevEnv = req.app.get("env") === "development";

  const errorResponse = {
    result: "error",
    error: isDevEnv ? err.message : "Internal Server Error",
  };

  if (isDevEnv) {
    errorResponse.stack = err.stack;
  }

  res.status(err.status || 500).json(errorResponse);
});

module.exports = app;
