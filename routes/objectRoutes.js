const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getObject,
  createObject,
  updateObject,
  deleteObject,
  updateObjectZindex,
} = require("../controllers/objectController");

router.route("/").post(createObject).put(updateObjectZindex);

router
  .route("/:object_id")
  .get(getObject)
  .put(updateObject)
  .delete(deleteObject);

module.exports = router;
