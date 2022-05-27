const express = require("express");
const catalog = require("./controllers/catalog");
const about = require("./controllers/about");
const errorPage=require("./controllers/404");
const create=require("./controllers/create");
const details=require("./controllers/details");
const router=express.Router();

router.get('/',catalog);
router.get('/about',about);
router.get('/create',create.getCreate);
router.post('/create',create.postCreate);
router.get('/details/:id',details);
router.get('*',errorPage);

module.exports=router;