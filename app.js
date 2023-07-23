const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const login = require("./routes/loginRoutes");
const presentation = require("./routes/presentationRoutes");
const slide = require("./routes/slideRoutes");
const object = require("./routes/objectRoutes");

const app = express();
mongoose.connect(process.env.MONGODB_URI);

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors(corsOptions));

const s3 = new AWS.S3({
  region: "ap-northeast-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "peachpitch",
    key: (req, file, cb) => {
      cb(null, Date.now().toString()); // use Date.now().toString() as the file name
    },
  }),
});

app.use("/login", login);
app.use("/users/:user_id/presentations", presentation);
app.use("/users/:user_id/presentations/:presentation_id/slides", slide);
app.use(
  "/users/:user_id/presentations/:presentation_id/slides/:slide_id/objects",
  upload.single("image"),
  object,
);

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
