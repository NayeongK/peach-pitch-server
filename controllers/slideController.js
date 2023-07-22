const mongoose = require("mongoose");
const Presentation = require("../models/Presentation");

async function getAllSlides(req, res, next) {
  const { presentation_id } = req.params;

  try {
    const presentation = await Presentation.findById(presentation_id);

    if (!presentation) {
      res.status(404).json({ message: "Presentation not found" });
    }

    const allSlides = presentation.slides;

    if (allSlides.length === 0) {
      res.status(200).json({
        message: "No slides found",
        slides: [],
      });
    }

    res.json({ result: "success", slides: allSlides });
  } catch (err) {
    next(err);
  }
}

async function getSlide(req, res, next) {
  const { presentation_id, slide_id } = req.params;

  try {
    const presentation = await Presentation.findById(presentation_id);
    const slide = presentation.slides.id(slide_id);

    if (!slide) {
      res.status(404).json({ message: "Slide not found" });
    }

    res.json({ result: "success", slide });
  } catch (err) {
    next(err);
  }
}

async function createSlide(req, res, next) {
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

    res.status(201).json({ result: "success", slide: newSlide });
  } catch (err) {
    next(err);
  }
}

async function deleteSlide(req, res, next) {
  const { presentation_id, slide_id } = req.params;

  try {
    const presentation = await Presentation.findById(presentation_id);
    const slide = presentation.slides.id(slide_id);

    if (!slide) {
      res.status(404).json({ message: "No slide found to delete" });
    }

    slide.remove();
    await presentation.save();

    res.status(200).json({ message: "Slide successfully deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getSlide,
  getAllSlides,
  createSlide,
  deleteSlide,
};
