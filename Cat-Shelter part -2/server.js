const data = require("./data.json");
const fs = require("fs/promises");
const saveCat = (cat) => {
  data.cats.push(cat);
  let body = JSON.stringify(data, "", 2);
  return fs.writeFile("./data.json", body);
};
const saveBreed = (breed) => {
  data.breeds.push(breed);
  let body = JSON.stringify(data, "", 2);
  return fs.writeFile("./data.json", body);
};
const updateCat = (search, up) => {
  let index = data.cats.indexOf(search);
  data.cats.splice(index, 1, up);

  let body = JSON.stringify(data, "", 2);
  return fs.writeFile("./data.json", body);
};
const deleteCat=(cat)=>{
  let index = data.cats.indexOf(cat);
  data.cats.splice(index,1);
  let body=JSON.stringify(data,'',2)
  return fs.writeFile("./data.json",body)
}

const storageServer = {
  saveCat,
  saveBreed,
  updateCat,
  deleteCat
};
module.exports = storageServer;
