const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  addObjectAnimation,
  deleteObjectAnimation,
} = require("../controllers/animationController");

router.route("/").post(addObjectAnimation);

router.route("/:animation_id").delete(deleteObjectAnimation);

module.exports = router;
