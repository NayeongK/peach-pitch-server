const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getAllSlides,
  createSlide,
  getSlide,
  deleteSlide,
} = require("../controllers/slideController");

router.route("/").get(getAllSlides).post(createSlide);

router.route("/:slide_id").get(getSlide).delete(deleteSlide);

module.exports = router;
