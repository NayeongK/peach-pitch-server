const mongoose = require("mongoose");
const ObjectSchema = require("./Object");

const SlideSchema = new mongoose.Schema({
  slideId: { type: mongoose.Schema.Types.ObjectId, required: true },
  objects: { type: [ObjectSchema], default: [] },
  animationSeq: { type: [ObjectSchema], default: [] },
});

module.exports = SlideSchema;
