const fs = require("fs/promises");
const path=require('path')
const uniqid = require("uniqid");

let data = {};

async function services() {
  try {
    data = JSON.parse(await fs.readFile("./models/data.json"));
    // let object=Object.values(data);
  } catch (err) {
    console.error("Error reading data");
  }
  return (req, res, next) => {
    req.storage = {
      getAll,
      getById,
      createCube
    };
    next();
  };
}
async function getAll() {
  let cubes = Object.entries(data).map(([id, v]) =>
    Object.assign({}, { id }, v)
  );
  return cubes;
}
async function getById(id) {
  let cubes = Object.values(data);
  let cube = cubes.find((x) => x.id == id);

  return cube;
}
async function createCube(cube) {
    data.push({ id: data[data.length - 1].id + 1, ...cube });

    let textData = JSON.stringify(data, '', 2);

    return fs.writeFile(path.resolve('models', 'data.json'), textData, { encoding: 'utf-8' })
}
module.exports = {
  services,
};
