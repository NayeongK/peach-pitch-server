const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema({
  presentationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Presentation",
    required: true,
  },
  objects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Object",
    },
  ],
  overlay: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Object",
    },
  ],
  animationSeq: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Object",
    },
  ],
});

module.exports = mongoose.model("Slide", SlideSchema);
