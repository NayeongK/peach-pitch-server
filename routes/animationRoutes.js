const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  addObjectAnimation,
  deleteObjectAnimation,
  updateObjectAnimation,
  getAllObjectAnimations,
} = require("../controllers/animationController");

router.route("/").get(getAllObjectAnimations).post(addObjectAnimation);

router
  .route("/:animation_id")
  .delete(deleteObjectAnimation)
  .put(updateObjectAnimation);

module.exports = router;
