const mongoose = require("mongoose");

const options = { discriminatorKey: "type" };

const objectBaseSchema = new mongoose.Schema(
  {
    order: { type: Number, min: 1 },
    coordinates: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
    dimensions: {
      height: { type: Number, required: true },
      width: { type: Number, required: true },
    },
    animation: {
      type: {
        type: String,
        enum: ["fade-in", "block-swipe", "3d flip"],
      },
      order: Number,
    },
  },
  options,
);

const shapeSchema = new mongoose.Schema(
  {
    innerColor: String,
    borderColor: String,
  },
  options,
);

const imageSchema = new mongoose.Schema(
  {
    imageUrl: String,
    borderColor: String,
  },
  options,
);

const textBoxSchema = new mongoose.Schema(
  {
    content: String,
    fontSize: Number,
    textAlign: String,
    fontFamily: String,
    fontStyle: String,
    innerColor: String,
    borderColor: String,
  },
  options,
);

const Object = mongoose.model("Object", objectBaseSchema);
Object.discriminator("Shape", shapeSchema);
Object.discriminator("Image", imageSchema);
Object.discriminator("TextBox", textBoxSchema);

module.exports = {
  Object,
  shapeSchema,
  imageSchema,
  textBoxSchema,
};
