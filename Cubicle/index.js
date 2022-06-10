const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const db = require("./config/datebase");
const port = 5000;
const router = require("./config/routes");
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
  app.use(express.urlencoded({ extended: false }));
  app.use(router);
  db()

  app.listen(port,() => console.log(`App is listening to port ${port}`));
}
