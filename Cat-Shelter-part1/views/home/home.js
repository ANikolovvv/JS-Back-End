const data = require("../../data.json");
//console.log(data);

 const template = (x) => {
  return `<li>
    <img src=${x.img}>
    <h3>${x.name}</h3>
    <p><span>Breed: </span>${x.breed}</p>
    <p><span>Description: </span>${x.description}</p>
    <ul class="buttons">
        <li class="btn edit"><a href="">Change Info</a></li>
        <li class="btn delete"><a href="">New Home</a></li>
    </ul>
</li>`;
};
const all = data.cats.map((x) => template(x)).join("");
module.exports = template;
