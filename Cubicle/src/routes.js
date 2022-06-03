const express = require("express");
const router=express.Router();
const homeCotroler=require("./controllers/homeControler");
const cubicControler=require("./controllers/cubicControl");

router.use('/',homeCotroler);
router.use("/cube",cubicControler);


module.exports=router;