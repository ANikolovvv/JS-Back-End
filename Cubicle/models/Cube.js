const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 200 },
  imageUrl: { type: String, required: true },
  difficultyLevel: { type: Number, required: true, min: 1, max: 6 },
  accessories: [{ type: mongoose.Types.ObjectId, ref: "Accessory" }]
});
const Cube = mongoose.model("Cube", cubeSchema);
cubeSchema.path("imageUrl").validate(function () {
  return this.imageUrl.startsWith("http");
}, "Image url should be a link");

module.exports = Cube;
