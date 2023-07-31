const mongoose = require("mongoose");
const ObjectSchema = require("./Object");

const SlideSchema = new mongoose.Schema({
  objects: { type: [ObjectSchema], default: [] },
  zIndexSequence: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  ],
  animationSequence: [
    {
      objectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      animationEffect: {
        type: String,
        enum: ["fade-in", "block-wipe", "3d-flip"],
        default: null,
      },
    },
  ],
});

module.exports = SlideSchema;
