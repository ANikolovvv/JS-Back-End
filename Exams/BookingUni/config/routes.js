const homeControler = require("../controlles/homeControler");
const authControler = require("../controlles/authControler");
const hotelControler = require("../controlles/hotelControler");

module.exports = (app) => {
  app.use("/", homeControler);
  app.use("/auth", authControler);
  app.use("/hotels", hotelControler);
};
