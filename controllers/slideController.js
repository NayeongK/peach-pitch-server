const mongoose = require("mongoose");
const Presentation = require("../models/Presentation");

async function getAllSlides(req, res) {
  const { presentation_id } = req.params;

  try {
    const presentation = await Presentation.findById(presentation_id);

    if (!presentation) {
      res.status(404).json({ message: "Presentation not found" });
      return;
    }

    const allSlides = presentation.slides;

    if (allSlides.length === 0) {
      res.status(200).json({
        message: "No slides found",
        slides: [],
      });
      return;
    }

    res.json(allSlides);
  } catch (err) {
    res.status(500).json({ result: "error", error: "Internal Server Error" });
  }
}

async function getSlide(req, res) {
  const { presentation_id, slide_id } = req.params;

  try {
    const presentation = await Presentation.findById(presentation_id);
    const slide = presentation.slides.id(slide_id);

    if (!slide) {
      res.status(404).json({ message: "Slide not found" });
      return;
    }

    res.json(slide);
  } catch (err) {
    res.status(500).json({ result: "error", error: "Internal Server Error" });
  }
}

async function createSlide(req, res) {
  const { presentation_id } = req.params;

  try {
    const presentation = await Presentation.findById(presentation_id);
    const newSlide = {
      slideId: new mongoose.Types.ObjectId(),
      objects: [],
      animationSeq: [],
    };
    presentation.slides.push(newSlide);

    await presentation.save();

    res.status(201).json(newSlide);
  } catch (err) {
    res.status(500).json({ result: "error", error: "Internal Server Error" });
  }
}

async function deleteSlide(req, res) {
  const { presentation_id, slide_id } = req.params;

  try {
    const presentation = await Presentation.findById(presentation_id);
    const slide = presentation.slides.id(slide_id);

    if (!slide) {
      res.status(404).json({ message: "No slide found to delete" });
      return;
    }

    slide.remove();
    await presentation.save();

    res.status(200).json({ message: "Slide successfully deleted" });
  } catch (err) {
    res.status(500).json({ result: "error", error: "Internal Server Error" });
  }
}

module.exports = {
  getSlide,
  getAllSlides,
  createSlide,
  deleteSlide,
};
