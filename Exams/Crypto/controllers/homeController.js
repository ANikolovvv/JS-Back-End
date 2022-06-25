const router = require("express").Router();
const dataServices = require("../services/dataServices");
const userServices = require("../services/userServices");

router.get("/", async (req, res) => {
  let all = await dataServices.getAll();

  res.render("home", { all });
});
router.get("/all", async (req, res) => {
  let all = await dataServices.getAll();
  let have = all.length !== 0;

  res.render("catalog", { all, have });
});

module.exports = router;
