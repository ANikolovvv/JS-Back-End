const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");

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
          rooms: req.body.rooms,
        },
      };

      res.render("create", ctx);
    }
  }
);

router.get("/details/:id", (req, res) => {
  res.render("details");
});
router.get("/edit/:id", (req, res) => {
  res.render("edit");
});
router.get("/search", (req, res) => {
  res.render("search");
});
router.all("*", (req, res) => {
  res.render("404");
});

module.exports = router;
