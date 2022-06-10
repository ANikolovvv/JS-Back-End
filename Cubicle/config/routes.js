const express = require("express");
const router = express.Router();
const homeControler = require("../controllers/homeControler");
const cubeControler = require("../controllers/cubeControler");
const authControler = require("../controllers/authControler");

router.use("/", homeControler);
router.use("/cube", cubeControler);
router.use("/auth", authControler);
router.use("*", (req, res) => {
  res.render("404");
});

module.exports = router;
