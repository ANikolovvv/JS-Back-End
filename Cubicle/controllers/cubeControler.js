const router = require("express").Router();
const cubeServices = require("../services/cubeServices");
const accessoryServices = require("../services/accesoryServices");
const { isAuth } = require("../middlewares/authMiddlewares");

router.get("/create", isAuth, (req, res) => {
  //console.log("create");
  res.render("create");
});

router.post("/create", isAuth, async (req, res) => {
  ///console.log(req.body.name);
  const cube = {
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    difficultyLevel: req.body.difficultyLevel,
    owner: req.user._id,
  };
  await cubeServices.createCube(cube);
  //console.log("post",cube);
  res.redirect("/");
});

router.get("/details/:id", isAuth, async (req, res) => {
  const cube = await cubeServices.getById(req.params.id);
  const isOwner = cube.owner == req.user._id;

  res.render("details", { cube, isOwner });
});

router.get("/accessory", isAuth, async (req, res) => {
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

router.get("/edit/:id", isAuth, async (req, res) => {
  const cube = await cubeServices.getById(req.params.id);
  if (cube.owner != req.user._id) {
    // TODO Add message
    return res.redirect("/404");
  }
  if (!cube) {
    return res.redirect("/404");
  }
  res.render("edit", { cube });
});

router.post("/edit/:id", isAuth, async (req, res) => {
  await cubeServices.editCube(req.params.id, req.body);
  res.redirect(`/cube/details/${req.params.id}`);
});

router.get("/delete/:id", isAuth, async (req, res) => {
  await cubeServices.deleteCube(req.params.id);
  res.redirect("/");
});

module.exports = router;
