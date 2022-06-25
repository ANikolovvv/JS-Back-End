const mongoose = require("mongoose");
const { DB_CONNECTION_STRING } = require("./env");

async function db() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log("DB is working :)");
  } catch (err) {
    console.log(err, "Error in Datebase !");
  }
}
module.exports = db;
