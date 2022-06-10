const router = require("express").Router();
const cubeServices = require("../services/cubeServices");
const accessoryServices = require("../services/accesoryServices");
const { isAuth } = require("../middlewares/authMiddlewares");

router.get("/create",isAuth, (req, res) => {
  console.log("create");
  res.render("create");
});

router.post("/create",isAuth, async (req, res) => {
  console.log(req.body.name);
  const cube = {
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    difficultyLevel: req.body.difficultyLevel,
  };
  await cubeServices.createCube(cube);
  //console.log("post",cube);
  res.redirect("/");
});

router.get("/details/:id",isAuth, async (req, res) => {
  const cube = await cubeServices.getById(req.params.id);
  console.log(cube.accessories);
  res.render("details", { cube });
});

router.get("/accessory",isAuth, async (req, res) => {
  res.render("createAccessory");
});

router.post("/accessory", async (req, res) => {
  const accessory = {
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  };
  await accessoryServices.createAccessory(accessory);

  res.redirect("/");
});

router.get("/attach/:id", async (req, res) => {
  const cube = await cubeServices.getById(req.params.id);
  const all = await accessoryServices.getAll();
  res.render("attachAccessory", { cube, all });
});

router.post("/attach/:id", async (req, res) => {
  await cubeServices.attachAccessory(req.params.id, req.body.accessory);

  res.redirect(`/cube/details/${req.params.id}`);
});

module.exports = router;
