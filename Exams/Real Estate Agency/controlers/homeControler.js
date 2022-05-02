const router = require("express").Router();

router.get("/", async (req, res) => {
  const houses = await req.storage.getAllHouses();
  const tops = houses.slice(-3);
  console.log(">>>", tops.length);
  res.render("home", { tops });
});
router.get("/aprt-for-recent", async (req, res) => {
  const houses = await req.storage.getAllHouses();
  res.render("aprt-for-recent", { houses });
});

module.exports = router;
