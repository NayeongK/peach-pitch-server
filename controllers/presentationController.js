const Presentation = require("../models/Presentation");

async function getAllPresentations(req, res) {
  const { user_id } = req.params;

  try {
    const allPresentations = await Presentation.find({
      userId: user_id,
    });

    if (allPresentations.length === 0) {
      res.status(200).json({
        message: "No presentations found created by the user",
        presentations: [],
      });
      return;
    }

    res.json(allPresentations);
  } catch (err) {
    res.status(500).json({ result: "error", error: "Internal Server Error" });
  }
}

async function createPresentation(req, res) {
  const { title } = req.body;

  try {
    const newPresentation = await Presentation.create(title);

    res.status(201).json(newPresentation);
  } catch (err) {
    res.status(500).json({ result: "error", error: "Internal Server Error" });
  }
}

async function deletePresentation(req, res) {
  const { id } = req.params;

  try {
    const deletedPresentation = await Presentation.findByIdAndDelete(id);

    if (!deletedPresentation) {
      res.status(404).json({ message: "No presentation found to delete" });
      return;
    }

    res.status(200).json({ message: "Presentation successfully deleted" });
  } catch (err) {
    res.status(500).json({ result: "error", error: "Internal Server Error" });
  }
}

async function savePresentation(req, res) {
  const { id } = req.params;
  const updates = req.body;

  try {
    let presentation = await Presentation.findById(id);

    if (!presentation) {
      res.status(404).json({ message: "No presentation found to save" });
      return;
    }
    await Presentation.findByIdAndUpdate(id, updates);
    presentation = await Presentation.findById(id);
    res
      .status(200)
      .json({ message: "Presentation successfully saved", presentation });
  } catch (err) {
    res.status(500).json({ result: "error", error: "Internal Server Error" });
  }
}

module.exports = {
  getAllPresentations,
  createPresentation,
  savePresentation,
  deletePresentation,
};
