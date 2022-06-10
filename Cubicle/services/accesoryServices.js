const Accessory = require("../models/Accessory");

async function getAll() {
  const allCubes = await Accessory.find({}).lean();
  return allCubes;
}

async function getById(id) {
  const cube = await Accessory.findById(id);
  try {
    return cube;
  } catch (error) {
    console.log(error, "error id");
  }
}

async function createAccessory(cube) {
  try {
    await Accessory.create(cube);
    console.log("Acc has create");
  } catch (error) {
    console.log("error,create Acc");
  }
}
module.exports = { getAll, getById, createAccessory };
