const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getObject,
  createObject,
  updateObject,
  deleteObject,
} = require("../controllers/objectController");

router.post("/", createObject);
router.get("/:object_id", getObject);
router.put("/:object_id", updateObject);
router.delete("/:object_id", deleteObject);

module.exports = router;
