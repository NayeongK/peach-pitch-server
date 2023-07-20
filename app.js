const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const login = require("./routes/login");
const presentation = require("./routes/presentation");
const slide = require("./routes/slide");

const app = express();
mongoose.connect(process.env.DB_URI);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use("/login", login);
app.use("/users/:user_id/presentations", presentation);
app.use("/users/:user_id/presentations/:presentation_id/slides", slide);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
