const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const login = require("./routes/loginRoutes");
const presentation = require("./routes/presentationRoutes");
const slide = require("./routes/slideRoutes");

const app = express();
mongoose.connect(process.env.MONGODB_URI);

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors(corsOptions));

app.use("/login", login);
app.use("/users/:user_id/presentations", presentation);
app.use("/users/:user_id/presentations/:presentation_id/slides", slide);

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
