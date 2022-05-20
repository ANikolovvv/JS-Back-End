const data = require("./data.json");
const fs = require("fs/promises");
const template = (x) => {
  return `<option value="${x}">${x}</option>`;
};
async function renderEditPage(id) {
  let addCatPageHtml = await fs.readFile("./views/editCat.html", {
    encoding: "utf-8",
  });
  const optionBreeds = await fs.readFile("./data.json");
  const breedData = JSON.parse(optionBreeds);

  const connectAll = breedData.breeds.map((x) => template(x.breed)).join("");

  let result = addCatPageHtml.replace("{{breed}}", connectAll);
  // console.log(result)
  return result;
}

module.exports = renderEditPage;
