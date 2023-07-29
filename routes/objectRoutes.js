const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getObject,
  getAllObjects,
  createObject,
  updateObject,
  deleteObject,
  updateObjectZindex,
} = require("../controllers/objectController");

router.route("/").get(getAllObjects).post(createObject).put(updateObjectZindex);

router
  .route("/:object_id")
  .get(getObject)
  .put(updateObject)
  .delete(deleteObject);

module.exports = router;
