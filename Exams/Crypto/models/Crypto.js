const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  name: { type: String, required: true },

  image: {
    type: String,
    required: true,
    validate: {
      validator: function () {
        return this.image.startsWith("http");
      },
      message: "Image url should be a link",
    },
  },
  price: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
  payment: {
    type: String,
    required: true,
    enum: ["crypto-wallet", "credit-card", "debit-card", "paypal"],
  },
  buyAcrypto: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

module.exports = Crypto;
