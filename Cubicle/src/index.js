const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const port = 3000;

const router = require("../routes");
const db = require("./config/datebase");
start();
async function start() {
  app.engine(
    "hbs",
    hbs.engine({
      extname: "hbs",
    })
  );
  app.set("view engine", "hbs");
  app.use("/static", express.static("static"));
  db();
  app.use(express.urlencoded({ extended: false }));
  app.use(router);

  app.listen(port, () => console.log(`App is listening to port ${port}`));
}
