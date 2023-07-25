const mongoose = require("mongoose");

const ObjectSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Circle", "Triangle", "Square", "TextBox", "Image"],
    required: true,
  },
  coordinates: {
    x: { type: Number, required: true, default: 100 },
    y: { type: Number, required: true, default: 100 },
  },
  dimensions: {
    height: { type: Number, required: true, default: 100 },
    width: { type: Number, required: true, default: 100 },
  },
  boundaryVertices: [
    {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  ],
  currentAnimation: { type: String, default: null },
});

const CircleSchema = new mongoose.Schema(
  {
    radius: { type: Number, required: true, default: 50 },
    fillColor: { type: String, default: "#FFFFFF" },
    borderColor: { type: String, default: "#000000" },
  },
  { _id: false },
);

const TriangleSchema = new mongoose.Schema(
  {
    vertices: {
      type: [
        {
          x: { type: Number, default: 0 },
          y: { type: Number, default: 0 },
        },
      ],
      default: [
        { x: 0, y: 100 },
        { x: 50, y: 0 },
        { x: 100, y: 100 },
      ],
    },
    fillColor: { type: String, default: "#FFFFFF" },
    borderColor: { type: String, default: "#000000" },
  },
  { _id: false },
);

const SquareSchema = new mongoose.Schema(
  {
    fillColor: { type: String, default: "#FFFFFF" },
    borderColor: { type: String, default: "#000000" },
  },
  { _id: false },
);

const TextBoxSchema = new mongoose.Schema(
  {
    content: { type: String, default: "New Textbox" },
    fontSize: { type: Number, default: 14 },
    fontFamily: { type: String, default: "Arial" },
    textAlign: {
      type: String,
      enum: ["left", "right", "center", "justify"],
      default: "left",
    },
    textColor: { type: String, default: "#000000" },
    fontStyle: {
      type: String,
      enum: ["normal", "bold", "italic", "underline", "strikeThrough"],
      default: "normal",
    },
    innerColor: { type: String, default: "#000000" },
    borderColor: { type: String, default: "#000000" },
  },
  { _id: false },
);

const ImageSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, default: "" },
    borderColor: { type: String, default: "#000000" },
  },
  { _id: false },
);

ObjectSchema.add({
  Circle: CircleSchema,
  Triangle: TriangleSchema,
  Square: SquareSchema,
  TextBox: TextBoxSchema,
  Image: ImageSchema,
});

module.exports = ObjectSchema;
