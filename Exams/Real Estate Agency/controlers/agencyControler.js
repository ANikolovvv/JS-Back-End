const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const userService = require("../services/user");

const router = require("express").Router();

router.get("/create", isUser(), (req, res) => {
  res.render("create");
});
router.post(
  "/create",
  isUser(),
  body("name")
    .isLength({ min: 6 })
    .withMessage("Name length must be bigger than 6")
    .bail(),
  body("year").isNumeric({ min: 1850, max: 2021 }),
  body("city").isLength({ min: 4 }).withMessage("City length must be 4 !"),
  async (req, res) => {
    console.log(req.body);
    const houseData = {
      name: req.body.name,
      type: req.body.type,
      year: req.body.year,
      city: req.body.city,
      homeImage: req.body.homeImage,
      propertyDescription: req.body.propertyDescription,
      availablePieces: req.body.availablePieces,
      rentedAHome: [],
      owner: req.user._id,
    };
    const { errors } = validationResult(req);
    try {
      if (errors.length > 0) {
        const message = errors.map((e) => e.msg).join("\n");
        throw new Error(message);
      }
      await req.storage.createHouse(houseData);
      res.redirect("/aprt-for-recent");
    } catch (err) {
      console.log(err.message);
      // errors: err.message.split("\n"),

      const ctx = {
        errors: err.message.split("\n"),
        houseData: {
          name: req.body.name,
          type: req.body.type,
          availablePieces: req.body.availablePieces,
          city: req.body.city,
          homeImage: req.body.homeImage,
        },
      };

      res.render("create", ctx);
    }
  }
);

router.get("/details/:id", async (req, res) => {
  try {
    // const existUsername = await userService.getUserByUsername(req.user.username);

    const house = await req.storage.getHouseById(req.params.id);

    house.creator = req.user && req.user._id == house.owner;
    house.ifRent = house.rentedAHome.some((x) => x == req.user.name);
    house.len = house.availablePieces > 0;
    let names = house.rentedAHome;

    house.have = names.length > 0;

    if (house.rentedAHome.length > 0) {
      let v = Object.values(house.rentedAHome).join(", ");

      house.v = v;
    }

    res.render("details", { house });
  } catch (err) {
    console.log(err.message);
    res.render("404");
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const house = await req.storage.getHouseById(req.params.id);
    if (req.user._id != house.owner) {
      throw new Error("Canot edit house");
    }
    res.render("edit", { house });
  } catch (err) {
    console.log(err.message);
    res.redirect("404");
  }
});
router.post("/edit/:id", async (req, res) => {
  const house = await req.storage.getHouseById(req.params.id);
  const houseData = {
    name: req.body.name,
    type: req.body.type,
    year: req.body.year,
    city: req.body.city,
    homeImage: req.body.homeImage,
    propertyDescription: req.body.propertyDescription,
    availablePieces: req.body.availablePieces,
    rentedAHome: house.rentedAHome,
    owner: req.user._id,
  };
  const { errors } = validationResult(req);
  try {
    if (errors.length > 0) {
      const message = errors.map((e) => e.msg).join("\n");
      throw new Error(message);
    }
    await req.storage.editHouse(req.params.id, houseData);
    res.redirect("/agency/details/" + req.params.id);
  } catch (err) {
    console.log(err.message);
    // errors: err.message.split("\n"),

    const ctx = {
      errors: err.message.split("\n"),
      houseData: {
        name: req.body.name,
        type: req.body.type,
        availablePieces: req.body.availablePieces,
        city: req.body.city,
        homeImage: req.body.homeImage,
      },
    };

    res.render("edit", ctx);
  }
});
router.get("/search", (req, res) => {
  res.render("search");
});
router.get("/rentHome/:id", async (req, res) => {
  const house = await req.storage.getHouseById(req.params.id);
  try {
    if (req.user._id == house.owner) {
      throw new Error("Canot like your play ");
    }

    await req.storage.addHouse(req.params.id, req.user.name);
    res.redirect("/agency/details/" + req.params.id);
  } catch (err) {
    console.log(err.message);
    res.redirect("/");
  }
});
router.get("/delete/:id", isUser(), async (req, res) => {
  await req.storage.deleteHouse(req.params.id);

  res.redirect("/");
});
router.all("*", (req, res) => {
  res.render("404");
});

module.exports = router;
