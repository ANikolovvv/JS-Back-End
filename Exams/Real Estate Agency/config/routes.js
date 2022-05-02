const homeControler = require("../controlers/homeControler");
const authControler = require("../controlers/authControler");
const agencyControler = require("../controlers/agencyControler");

module.exports = (app) => {
  app.use("/", homeControler);
  app.use("/auth", authControler);
  app.use("/agency", agencyControler);
};
