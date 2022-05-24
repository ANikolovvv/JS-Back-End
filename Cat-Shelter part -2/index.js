const express = require("express");
const app = express();
const port = 5000;
const data = require("./data.json");
const formidable = require("formidable");
const bodyParser = require("body-parser").urlencoded({
  extended: true,
});
//const allCatsControler = require("./controllers/allCatsController.js");
const path = require("path");
const storageServer = require("./server.js");
//const requestLoger = require("./middlewares/requestLogin.js");
const { engine } = require("express-handlebars");

app.engine(
  "hbs",
  engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.use(bodyParser);
app.use(express.static("./public"));

// app.use('/cats',allCatsControler)
// app.use('/cats',requestLoger,allCatsControler)
app.get("/", (req, res) => {
  //   let absolutePath = path.resolve(__dirname, "./views/home/index.html");
  //   res.sendFile(absolutePath);
  let cats = data.cats;
  let search = Object.values(req.query);

  if (search.length > 0) {
    let name = search[0].toLowerCase();
    cats = data.cats.filter((x) => x.name.toLowerCase().includes(name));
  }

  let have = false;
  if (cats.length > 0) {
    have = true;
  }
  res.render("home", {
    cats,
    have,
  });
});
// app.use(requestLoger);
// app.get("/cats/:userId", (req, res) => {
//   res.header({
//     "Content-Type": "text/html",
//   });
//   res.send(req.params);
//   console.log(req.params);
//   res.end();
// });
app.get("/cats/add-cat", (req, res) => {
  // res.header({
  //   "Content-Type": "text/html",
  // });
  // res.end();
  let breeds = data.breeds.map((b) => b.breed);
  console.log(breeds);
  res.render("addCat", {
    breeds,
  });
});
app.get("/cats/add-breed", (req, res) => {
  res.render("addBreed");
});
app.get("/cats/edit/:id", (req, res) => {
  let finds = Object.values(data.cats);
  let num = Number(req.params.id);
  let catData = finds.find((x) => x.id === num);
  let breeds = ["White", "Black", "Persia"];
  //console.log(storageServer.updateCat(catData))

  res.render("editCat", { catData, breeds });
});
app.post("/cats/edit/:id", (req, res) => {
  const catData = Object.values(data.cats);
  const cat = catData.find((x) => x.id === Number(req.params.id));
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    console.log(fields);
    storageServer.updateCat(cat, fields);
  });
  console.log("work");
  res.redirect("/");
});

app.post("/cats/add-cat", (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    console.log(fields);
    storageServer.saveCat(fields);
  });

  res.redirect("/");
});
app.post("/cats/add-breed", (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    storageServer.saveBreed(fields);
  });

  res.redirect("/");
});
app.get("/cats/shelter/:id", (req, res) => {
  const catData = Object.values(data.cats);
  const cat = catData.find((x) => x.id === Number(req.params.id));
  //console.log(cat)
  res.render("catShelter", { cat });
});
app.post("/cats/shelter/:id", (req, res) => {
  const catData = Object.values(data.cats);
  const cat = catData.find((x) => x.id === Number(req.params.id));
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    storageServer.deleteCat(cat);
    res.redirect("/");
  });
  //res.render("catShelter",{cat})
});

app.listen(port, () => console.log("Ït is time for work."));
