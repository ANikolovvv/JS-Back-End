const { SESSION_NAME } = require("../config/env");
const { isUser, isGuest } = require("../middlewares/isGuard");
const authServices = require("../services/authServices");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");

router.get("/register", isGuest, (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  isGuest,
  body("username")
    .isLength({ min: 5 })
    .withMessage("Minimum 5 letters username"),
  body("email").isLength({ min: 10 }).withMessage("Minimum 10 letters"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password length must be at least 4"),
  body("rePass").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Passwords dont match!!!");
    }
    return true;
  }),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        let message = errors.map((x) => x.msg).join("\n");
        throw new Error(message);
      }
      let token = await authServices.register(req.body);

      console.log("Token hasbeen created", req.body);
      res.cookie(SESSION_NAME, token, { httpOnly: true });
      res.redirect("/");
    } catch (err) {
      console.log(err.message.split("\n"), "error user");
      const ctx = { errors: err.message.split("\n") };
      res.status(401);
      res.render("register", ctx);
    }
  }
);
router.get("/login", isGuest, (req, res) => {
  res.render("login");
});

router.post("/login", isGuest, async (req, res) => {
  try {
    let token = await authServices.login(req.body);
    //console.log("Token hasbeen created", token);
    res.cookie(SESSION_NAME, token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    console.log(err, "login error");
    let ctx = { errors: err.message };
    res.status(404);
    res.render("login", ctx);
  }
});

router.get("/logout", isUser, (req, res) => {
  res.clearCookie(SESSION_NAME);
  res.redirect("/");
});
module.exports = router;
