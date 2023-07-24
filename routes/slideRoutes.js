const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getAllSlides,
  createSlide,
  getSlide,
  deleteSlide,
  updateSlides,
} = require("../controllers/slideController");

router.route("/").get(getAllSlides).post(createSlide).put(updateSlides);

router.route("/:slide_id").get(getSlide).delete(deleteSlide);

module.exports = router;
