const router = require("express").Router();

const dataServices = require("../services/dataServices");
const userServices = require("../services/userServices");
const { body, validationResult } = require("express-validator");
const { isUser } = require("../middlewares/isGuard");

router.get("/create", isUser, async (req, res) => {
  console.log(req.user._id, "req.user is working");
  res.render("create");
});

router.post(
  "/create",
  isUser,
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
      await dataServices.createData(req.body, req.user._id);
      res.redirect("/all");
    } catch (err) {
      console.log(err, "create err");
      const ctx = {
        errors: err.message.split("\n"),
        body: req.body,
      };
      res.status(400);
      res.render("create", ctx);
    }
  }
);
router.get("/details/:id", async (req, res) => {
  let crypto = await dataServices.getData(req.params.id);

  let ctx = {};
  if (req.user) {
    let some = crypto.buyAcrypto.some((x) => x._id == req.user._id);
    let isOwner = crypto.owner == req.user._id;
    let add = some == false;
    ctx.crypto = crypto;
    ctx.isOwner = isOwner;
    ctx.add = add;
    ctx.user = req.user;
  } else {
    ctx.crypto = crypto;
  }
  

  res.render("details", ctx);
});
router.get("/buy/:id", isUser, async (req, res) => {
  await dataServices.shareData(req.params.id, req.user._id);
  res.redirect(`/data/details/${req.params.id}`);
});
router.get("/search", isUser, async (req, res) => {
  let all = await dataServices.getAll();
  let have = all.length !== 0;
  res.render("search", { all, have });
});
router.post("/search", isUser, async (req, res) => {
  console.log(req.body);
  const query = req.body.search.trim();
  const payment = req.body.payment.trim();

  let all = [];
  if (query !== "") {
    all = await dataServices.searchName(query);
  } else if (payment !== "") {
    all = await dataServices.searchData(payment);
  }

  let have = all.length !== 0;
  if (have && req.body.search) {
  }
  console.log(all);
  res.render("search", { have, all });
});

module.exports = router;
