const data = require("../../data.json");

const template = (x) => {
    return `<option value="${x}">${x}</option>`;
};

const allBreeds=data.breeds.map(x=>template(x.breed)).join('');

module.exports=allBreeds;