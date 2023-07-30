const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getAllSlides,
  createSlide,
  getSlide,
  deleteSlide,
  updateSlides,
  updateObjectAnimationSequence,
} = require("../controllers/slideController");

router.route("/").get(getAllSlides).post(createSlide).put(updateSlides);

router.route("/:slide_id").get(getSlide).delete(deleteSlide);

router.route("/:slide_id/animations").put(updateObjectAnimationSequence);

module.exports = router;
