const router = require("express").Router();
const {
  getAllPresentations,
  createPresentation,
  savePresentation,
  deletePresentation,
} = require("../controllers/presentationController");

router.route("/").get(getAllPresentations).post(createPresentation);

router
  .route("/:presentation_id")
  .put(savePresentation)
  .delete(deletePresentation);

module.exports = router;
