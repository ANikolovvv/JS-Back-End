const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 200 },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        return this.imageUrl.startsWith("http");
      },
      message: "Image url should be a link",
    },
  }
});
const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
