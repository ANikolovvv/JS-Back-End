const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: [true, "All fields are required"],
    minlength: 4,
  },
  city: { type: String, required: true, minlength: 3 },
  imageUrl: {
    type: String,
    required: true,
    match: [/^https?/, "Image must be http or https"],
  },
  rooms: { type: Number, required: true, min: 1, max: 100 },
  bookedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = model("Hotel", schema);
