const Presentation = require("../models/Presentation");

async function getAllPresentations(req, res) {
  const { user_id } = req.params;

  try {
    const allPresentations = await Presentation.find({
      userId: user_id,
    });

    if (!allPresentations) {
      res
        .status(404)
        .send({ message: "No presentations found created by the user" });
      return;
    }

    res.json(allPresentations);
  } catch (err) {
    res.status(500).send({ result: "error", error: "Internal Server Error" });
  }
}

async function createPresentation(req, res) {
  const { title } = req.body;

  try {
    const newPresentation = await Presentation.create(title);

    res.status(201).json(newPresentation);
  } catch (err) {
    res.status(500).send({ result: "error", error: "Internal Server Error" });
  }
}

async function deletePresentation(req, res) {
  const { id } = req.params;

  try {
    const deletedPresentation = await Presentation.findByIdAndDelete(id);

    if (!deletedPresentation) {
      res.status(404).send({ message: "No presentation found to delete" });
      return;
    }

    res.status(200).send({ message: "Presentation successfully deleted" });
  } catch (err) {
    res.status(500).send({ result: "error", error: "Internal Server Error" });
  }
}

module.exports = {
  getAllPresentations,
  createPresentation,
  deletePresentation,
};
