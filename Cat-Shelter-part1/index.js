const http = require("http");
const fs = require("fs");
const formidable = require("formidable");
const storageServer = require("./server.js");

const allBreeds = require("./views/home/breed");
const data = require("./data.json");
const template = require("./views/home/home");

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      console.log(req.method);
      if (req.method === "GET") {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        fs.readFile("./views/home/index.html", "utf8", (err, text) => {
          if (err) {
            res.statusCode = 404;
            return res.end();
          }
          // console.log(home.all)
          text = text.replace(
            `{{home}}`,
            data.cats.map((x) => template(x)).join("")
          );

          res.write(text);
          res.end();
        });
      } else if (req.method === "POST") {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
          // storageServer.saveBreed(fields).then(() => {
          //   res.end();
          // });
          const search = fields.search.toLocaleLowerCase();
          const filter = data.cats.filter((n) =>
            n.name.toLowerCase().includes(search)
          );
          console.log(filter);

          //   res.writeHead(302, {
          //     Location: "/",
          //   });
          res.end();
        });
      }
      break;
    case "/content/styles/site.css":
      let css = fs.readFileSync("./content/styles/site.css");
      res.writeHead(200, {
        "Content-Type": "text/css",
      });
      res.write(css);
      res.end();
      break;

    case "/cats/add-breed":
      //console.log(req.method);

      if (req.method === "GET") {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        //let s=fs.readFileSync("./views/addBreed.html")
        fs.readFile("./views/addBreed.html", (err, text) => {
          if (err) {
            res.statusCode = 404;
            return res.end();
          }
          res.write(text);
          res.end();
        });
      } else if (req.method === "POST") {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
          storageServer.saveBreed(fields).then(() => {
            res.end();
          });
          console.log(fields);
          res.writeHead(302, {
            Location: "/",
          });
          res.end();
        });
      }
      break;
    case "/cats/add-cat":
      if (req.method === "GET") {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        console.log(allBreeds);
        fs.readFile("./views/addCat.html", "utf8", (err, text) => {
          if (err) {
            res.statusCode = 404;
            return res.end();
          }
          text = text.replace(`{{breed}}`, allBreeds);
          res.write(text);
          res.end();
        });
      } else if (req.method === "POST") {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
          storageServer.saveCat(fields).then(() => {
            res.end();
          });
          res.writeHead(302, {
            Location: "/",
          });
          res.end();
        });
      }
      break;
  }
});
server.listen(5000, () => console.log("Server is listening on port 5000..."));
