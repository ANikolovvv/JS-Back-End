const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isGuest } = require("../middlewares/guards");

router.get("/register", isGuest(),(req, res) => {
  res.render("register");
});

router.post(
  "/register",
  isGuest(),
  body("name").matches(/^[A-Za-z]+[ ][A-Za-z]+$/).withMessage('Full name must start with '),
  body("username")
    .isLength({ min: 5 })
    .withMessage("Username length must be bigger than 5")
    .bail()
    .isAlphanumeric()
    .withMessage("Username my content only lettars"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 !"),
  body("rePass").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Passwords dont match");
    }
    return true;
  }),
  async (req, res) => {
    const { errors } = validationResult(req);
    try {
      if (errors.length > 0) {
        const message = errors.map((e) => e.msg).join("\n");
        throw new Error(message);
      }
      console.log(`pass>>>${req.body.password}`)
      await req.auth.register(req.body.name,req.body.username, req.body.password);
      res.redirect("/");
      console.log(errors);
    } catch (err) {
      console.log(err.message);
      const ctx = {
        errors: err.message.split("\n"),
        userData: {
          name:req.body.name,
          username: req.body.username,
        },
      };
      console.log(`Error >>>`, err.message);
      res.render("register", ctx);
    }
  }
);
router.get("/login", (req, res) => {
  res.render("login");
});
router.post('/login',isGuest() ,async(req,res)=>{
     try {
         await req.auth.login(req.body.username,req.body.password);
         res.redirect('/')
     } catch (err) {
         const ctx={
             errors:[err.message],
             userData:{
                  name:req.body.username,
                 username:req.body.username
             }
         }
         res.render('login',ctx)
     }
   
 })
router.get("/logout", (req, res) => {
  req.auth.logout();
  res.redirect("/");
});
router.all("*", (req, res) => {
  res.render("404");
});

module.exports = router;
