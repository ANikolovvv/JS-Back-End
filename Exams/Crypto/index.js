const express = require("express");
const hbs = require("express-handlebars");
const { PORT } = require("./config/env");
const cookieParser = require("cookie-parser");
const db = require("./config/datebase");
const { isAuth } = require("./middlewares/isAuth");
const router = require("./config/routes");
const app = express();

startServer();

async function startServer() {
  app.engine(
    ".hbs",
    hbs.engine({
      extname: ".hbs",
    })
  );
  app.set("view engine", ".hbs");
  app.use("/static",express.static("static"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(isAuth);
  app.use(router)

  db();
  app.listen(PORT, () => console.log(`Server  is running on port ${PORT} (:`));
}
