const router = require("express").Router();
const { sessionName } = require("../env");
const cubeServices = require("../services/cubeServices");

router.get("/", async (req, res) => {
  let { search, from, to } = req.query;
  let token = req.cookies[sessionName];
  console.log(token);
  const cubes = await cubeServices.getAll(search, from, to);

  res.render("index", { cubes });
});
router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
