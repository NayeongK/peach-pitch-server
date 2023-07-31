const mongoose = require("mongoose");
const Presentation = require("../models/Presentation");

async function createObject(req, res, next) {
  const { presentation_id, slide_id } = req.params;
  const { type, imageUrl } = req.body;
  const defaultObjectProperties = {
    objectId: new mongoose.Types.ObjectId(),
    type,
    coordinates: { x: 100, y: 100 },
    dimensions: { height: 100, width: 100 },
    boundaryVertices: [
      { x: 0, y: 0 },
      { x: 50, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 50 },
      { x: 100, y: 100 },
      { x: 50, y: 100 },
      { x: 0, y: 100 },
      { x: 0, y: 50 },
    ],
    animation: {},
  };

  switch (type) {
    case "Circle":
      defaultObjectProperties.Circle = {
        radius: 50,
        fillColor: "#FFFFFF",
        borderColor: "#000000",
      };
      break;
    case "Triangle":
      defaultObjectProperties.Triangle = {
        vertices: [
          { x: 0, y: 100 },
          { x: 50, y: 0 },
          { x: 100, y: 100 },
        ],
        fillColor: "#FFFFFF",
        borderColor: "#000000",
      };
      break;
    case "Square":
      defaultObjectProperties.Square = {
        fillColor: "#FFFFFF",
        borderColor: "#000000",
      };
      break;
    case "Textbox":
      defaultObjectProperties.Textbox = {
        content: "New Textbox",
        fontSize: 14,
        textAlign: "left",
        fontFamily: "Arial",
        fontStyle: "normal",
        innerColor: "#000000",
        borderColor: "#000000",
      };
      break;
    case "Image":
      defaultObjectProperties.Image = {
        imageUrl,
        borderColor: "#000000",
      };
      break;
    default:
      return res
        .status(400)
        .json({ result: "error", message: "Invalid object type" });
  }

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

    slide.objects.push(defaultObjectProperties);
    slide.zIndexSequence.push(defaultObjectProperties.objectId.toString());

    await presentation.save();

    const createdObject = slide.objects[slide.objects.length - 1];

    slide.zIndexSequence.push(createdObject._id.toString());

    await presentation.save();

    res.json({
      result: "success",
      message: "Object successfully created",
      object: defaultObjectProperties,
    });
  } catch (err) {
    next(err);
  }
}

async function getAllObjects(req, res, next) {
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

    res.json({
      result: "success",
      message: "Objects successfully retrieved",
      objects: slide.objects,
    });
  } catch (err) {
    next(err);
  }
}

async function getObject(req, res, next) {
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

    const object = slide.objects.id(object_id);
    if (!object) {
      return res
        .status(404)
        .json({ result: "error", message: "Object not found" });
    }

    res.json({
      result: "success",
      message: "Object successfully retrieved",
      object,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteObject(req, res, next) {
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
    const object = slide.objects.id(object_id);
    if (!object) {
      return res
        .status(404)
        .json({ result: "error", message: "Object not found" });
    }
    slide.objects.pull(object_id);
    slide.zIndexSequence = slide.zIndexSequence.filter(id => id !== object_id);
    await presentation.save();
    res.json({
      result: "success",
      message: "Object successfully deleted",
    });
  } catch (err) {
    next(err);
  }
}

async function updateObject(req, res, next) {
  const { presentation_id, slide_id, object_id } = req.params;
  const updateData = req.body;

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

    Object.assign(object, updateData);

    await presentation.save();

    res.json({
      result: "success",
      message: "Object successfully updated",
      object,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createObject,
  getObject,
  getAllObjects,
  updateObject,
  deleteObject,
};
