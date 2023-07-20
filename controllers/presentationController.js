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
        .send({ result: "error", error: "Presentations not found" });
      return;
    }

    res.json(allPresentations);
  } catch (err) {
    res.status(500).send({ result: "error", error: "Internal Server Error" });
  }
}

module.exports = {
  getAllPresentations,
};
