const fs = require("fs/promises");
const data = require("./data.json");
const catTemplate = (cat) => `
    <li>
        <img src="${cat.img}" alt="Black Cat">
        <h3>${cat.name}</h3>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
            <li class="btn edit"><a href=/edit/${cat.id}>Change Info</a></li>
            <li class="btn delete"><a href="">New Home</a></li>
        </ul>
    </li>
`;

async function renderHome(search) {
  // console.log(data)
  let homePageHtml = await fs.readFile("./views/home.html", "utf-8");
  let catsResult = await fs.readFile("./data.json");
  let catsData = JSON.parse(catsResult);
  const catsPageResult = catsData.cats
    .filter((x) =>
      search ? x.name.toLowerCase().startsWith(search.toLowerCase()) : true
    )
    .map((x) => catTemplate(x))
    .join("");

  const homePageResult = homePageHtml.replace("{{home}}", catsPageResult);

  return homePageResult;
}

exports.renderHome = renderHome;
