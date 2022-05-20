const http = require("http");
const fs = require("fs/promises");
const querystring = require("querystring");
const formidable = require("formidable");
const storageServer = require("./server.js");
const { renderHome } = require("./home");
const renderAddCatPage = require("./breedOption.js");
const renderEditPage = require("./editOption.js");

const server = http.createServer(async (req, res) => {
  let [pathname, qs] = req.url.split("?");

  let params = querystring.parse(qs);
  console.log(req.url.includes("edit"));

  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  if (req.url == "/styles/site.css") {
    res.writeHead(200, {
      "Content-Type": "text/css",
    });

    let siteCss = await fs.readFile("./styles/site.css", "utf-8");
    //console.log('site',siteCss)
    res.write(siteCss);
  } else if (req.url == "/cats/add-cat") {
    if (req.method == "GET") {
      let addCatPage = await renderAddCatPage();
      res.write(addCatPage);
    } else {
      let form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        storageServer.saveCat(fields).then(() => {
          res.end();
        });
        console.log(fields);
      });
      res.writeHead(301, {
        Location: "/",
      });
      res.end();
    }
  } else if (req.url == "/cats/add-breed") {
    if (req.method == "GET") {
      let addBreed = await fs.readFile("./views/addBreed.html");
      res.write(addBreed);
    } else {
      let form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        storageServer.saveBreed(fields).then(() => {
          res.end();
        });
        console.log(fields);
      });
      res.writeHead(301, {
        Location: "/",
      });
      res.end();
    }
  } else if (req.url.includes("edit")) {
    console.log("edit");
    let edit = await renderEditPage();
    res.write(edit);
  } else if (req.url == "/") {
    let homePage = await renderHome(params.name);
    res.write(homePage);
  }

  res.end();
});

server.listen(5000, () => console.log("Server is listening on port 5000..."));
