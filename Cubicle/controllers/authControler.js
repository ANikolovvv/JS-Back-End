const router = require("express").Router();

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  console.log(req.body);
  res.redirect("/login");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
