const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isUser } = require("../middlewares/isGuard");
const dataServices = require("../services/dataServices");

router.get("/edit/:id", isUser, async (req, res) => {
  let crypto = await dataServices.getData(req.params.id);

  res.render("edit", { crypto });
});
router.post(
  "/edit/:id",
  body("name")
    .matches(/^[A-Za-z]+[ ][A-Za-z]+$/)
    .withMessage("Name must be with two words"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("description minimum 10 characters"),
  async (req, res) => {
    try {
      let price = req.body.price < 0;
      if (price) {
        throw new Error("Price must be a positive number");
      }
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        let message = errors.map((x) => x.msg).join("\n");
        throw new Error(message);
      }

      console.log(req.body);
      await dataServices.updateData(req.body, req.params.id, req.user._id);
      res.redirect(`/data/details/${req.params.id}`);
    } catch (err) {
      console.log(err, "edit err");
      const ctx = {
        errors: err.message.split("\n"),
        crypto: req.body,
      };
      res.status(400);
      res.render(`edit`, ctx);
    }
  }
);
router.get("/delete/:id", isUser, async (req, res) => {
  console.log("delete");
  await dataServices.deleteData(req.params.id);
  res.redirect("/all");
});

module.exports = router;
