const mongoose = require("mongoose");
const Presentation = require("../models/Presentation");

async function getAllSlides(req, res, next) {
  const { presentation_id } = req.params;

  try {
    const presentation = await Presentation.findById(presentation_id);

    if (!presentation) {
      return res
        .status(404)
        .json({ result: "error", message: "Presentation not found" });
    }

    const allSlides = presentation.slides;

    if (allSlides.length === 0) {
      return res.json({
        result: "success",
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
      return res
        .status(404)
        .json({ result: "error", message: "Slide not found" });
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

    res.json({ result: "success", slide: newSlide });
  } catch (err) {
    next(err);
  }
}

async function deleteSlide(req, res, next) {
  const { presentation_id, slide_id } = req.params;

  try {
    const presentation = await Presentation.findById(presentation_id);

    if (!presentation) {
      return res
        .status(404)
        .json({ result: "error", message: "Presentation not found" });
    }

    presentation.slides.pull(slide_id);
    await presentation.save();

    res
      .status(200)
      .json({ result: "success", message: "Slide successfully deleted" });
  } catch (err) {
    next(err);
  }
}

async function updateSlides(req, res, next) {
  const { presentation_id } = req.params;
  const newSequence = req.body.newOrder;

  try {
    const presentation = await Presentation.findById(presentation_id);

    if (!presentation) {
      return res
        .status(404)
        .json({ result: "error", message: "Presentation not found" });
    }

    const newSlides = newSequence.map(id => presentation.slides.id(id));

    presentation.slides = newSlides;

    await presentation.save();

    res.json({ result: "success", message: "Slide successfully updated" });
  } catch (err) {
    next(err);
  }
}

async function updateObjectAnimationSequence(req, res, next) {
  const { presentation_id, slide_id } = req.params;
  const { newSequence } = req.body;

  try {
    const presentation = await Presentation.findById(presentation_id);

    if (!presentation) {
      return res
        .status(404)
        .json({ result: "error", message: "Presentation not found" });
    }

    const slide = presentation.slides.id(slide_id);
    if (!slide) {
      return res
        .status(404)
        .json({ result: "error", message: "Slide not found" });
    }

    slide.animationSequence = newSequence;

    await presentation.save();

    res.json({
      result: "success",
      message: "Animation sequence successfully updated",
      animationSeq: slide.animationSequence,
    });
  } catch (err) {
    next(err);
  }
}

async function updateObjectOverlay(req, res, next) {
  const { presentation_id, slide_id } = req.params;
  const { newZIndexSequence, newObjectSequence } = req.body;
  try {
    const presentation = await Presentation.findById(presentation_id);
    if (!presentation) {
      return res
        .status(404)
        .json({ result: "error", message: "Presentation not found" });
    }

    const slide = presentation.slides.id(slide_id);
    if (!slide) {
      return res
        .status(404)
        .json({ result: "error", message: "Slide not found" });
    }
    slide.zIndexSequence = newZIndexSequence;

    slide.objects = newObjectSequence;

    slide.markModified("zIndexSequence");
    slide.markModified("objects");
    presentation.markModified("slides");

    await presentation.save();

    res.json({
      result: "success",
      message: "Slide updated successfully",
      updatedSlide: slide,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getSlide,
  getAllSlides,
  createSlide,
  deleteSlide,
  updateSlides,
  updateObjectAnimationSequence,
  updateObjectOverlay,
};
