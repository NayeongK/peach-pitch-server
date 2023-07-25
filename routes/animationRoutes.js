const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  addObjectAnimation,
  deleteObjectAnimation,
  updateObjectAnimation,
  getAllObjectAnimations,
  updateObjectAnimationSequence,
} = require("../controllers/animationController");

router
  .route("/")
  .get(getAllObjectAnimations)
  .post(addObjectAnimation)
  .put(updateObjectAnimationSequence);

router
  .route("/:animation_id")
  .delete(deleteObjectAnimation)
  .put(updateObjectAnimation);

module.exports = router;
