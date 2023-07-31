const Presentation = require("../models/Presentation");

async function addObjectAnimation(req, res, next) {
  const { presentation_id, slide_id, object_id } = req.params;
  const { animationType } = req.body;

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

    const object = slide.objects.id(object_id);
    if (!object) {
      return res
        .status(404)
        .json({ result: "error", message: "Object not found" });
    }

    object.currentAnimation = animationType;

    const index = slide.animationSequence.findIndex(
      obj => obj.objectId.toString() === object_id,
    );

    if (index !== -1) {
      slide.animationSequence[index].animationEffect = animationType;
    } else {
      slide.animationSequence.push({
        objectId: object_id,
        animationEffect: animationType,
      });
    }

    await presentation.save();

    res.json({
      result: "success",
      message: "Animation successfully added",
      animationSequence: slide.animationSequence,
    });
  } catch (err) {
    next(err);
  }
}

async function getAllObjectAnimations(req, res, next) {
  const { presentation_id, slide_id } = req.params;

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

    const allAnimations = slide.animationSequence;

    res.json({
      result: "success",
      message: "Animation successfully added",
      allAnimations,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteObjectAnimation(req, res, next) {
  const { presentation_id, slide_id, object_id } = req.params;

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

    const animationIndex = slide.animationSequence.findIndex(
      animation => animation.objectId.toString() === object_id,
    );

    if (animationIndex > -1) {
      slide.animationSequence.splice(animationIndex, 1);
    } else {
      return res
        .status(404)
        .json({ result: "error", message: "Animation not found in sequence" });
    }

    const object = slide.objects.id(object_id);
    if (object) {
      object.currentAnimation = null;
    } else {
      return res
        .status(404)
        .json({ result: "error", message: "Object not found" });
    }

    await presentation.save();

    res.json({
      result: "success",
      message:
        "Animation successfully deleted, and was removed from animation sequence",
    });
  } catch (err) {
    next(err);
  }
}

async function updateObjectAnimation(req, res, next) {
  const { presentation_id, slide_id, object_id } = req.params;
  const { newAnimation } = req.body;

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

    const object = slide.objects.id(object_id);
    if (!object) {
      return res
        .status(404)
        .json({ result: "error", message: "Object not found" });
    }

    object.currentAnimation = newAnimation;

    await presentation.save();

    return res.json({
      result: "success",
      message: "Animation successfully updated",
      updatedAnimation: object.currentAnimation,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addObjectAnimation,
  getAllObjectAnimations,
  deleteObjectAnimation,
  updateObjectAnimation,
};
