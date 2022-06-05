const Accessory = require("../models/Accessory");
const Cube = require("../models/Cube");

async function getAll(search = "", from, to) {
  const min = Number(from) || 0;
  const max = Number(to) || 6;

  const cubes = await Cube.find({ name: { $regex: new RegExp(search, "i") } })
    .where("difficultyLevel")
    .lte(max)
    .gte(min)
    .lean();

  return cubes;
}
async function getById(id) {
  const cube = await Cube.findById(id).populate("accessories").lean();
  try {
    return cube;
  } catch (error) {
    console.log(error, "error id");
  }
}

async function createCube(cube) {
  try {
    await Cube.create(cube);
    console.log("Cube has create");
  } catch (error) {
    console.log("error,create Cube");
  }
}
async function attachAccessory(id, acc) {
  const cube = await Cube.findById(id);
  const accessory = await Accessory.findById(acc);
  console.log("getaccc");
  console.log(accessory, "aasadsdsda");
  cube.accessories.push(accessory);

  try {
    return cube.save();
  } catch (error) {
    console.log("errr");
  }

  return cube;
}

module.exports = { getAll, getById, createCube, attachAccessory };
