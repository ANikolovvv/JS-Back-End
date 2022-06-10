const router = require("express").Router();
const { sessionName } = require("../env");
const authservices = require("../services/authServices");

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", async (req, res) => {
  let createUser = await authservices.register(req.body);
   
  if (createUser) {
    res.redirect("/auth/login");
  } else {
    console.log(createUser,'error')
    res.redirect("404");
  }
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", async (req, res) => {
  const token = await authservices.login(req.body);
  if (!token) {
    res.redirect("/404");
  }
  res.cookie(sessionName, token, { httpOnly: true });

  res.redirect("/");
});
router.get("/logout", (req, res) => {
  res.clearCookie(sessionName);
  res.redirect("/");
});

module.exports = router;
