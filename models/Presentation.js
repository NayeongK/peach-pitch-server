const mongoose = require("mongoose");
const SlideSchema = require("./Slide");

const presentationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slides: { type: [SlideSchema], default: [] },
});

module.exports = mongoose.model("Presentation", presentationSchema);
