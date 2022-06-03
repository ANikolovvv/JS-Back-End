const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("create");
});
router.post("/create", (req, res) => {
  console.log(req.body.name);
  const cube = {
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    difficultyLevel: req.body.difficultyLevel,
  };
  //await req.storage.createCube(cube)
  console.log("post",cube);
  res.redirect("/");
});
router.get('/details/:id',(req,res)=>{
    res.render('details')
})

module.exports = router;
