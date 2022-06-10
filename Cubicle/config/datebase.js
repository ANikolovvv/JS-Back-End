const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/softuni-cubicle";

async function db() {
  try {
    await mongoose.connect(url);
    console.log("DB is working");
  } catch (err) {
    console.log(err, "Error in Datebase");
  }
}
module.exports = db;
