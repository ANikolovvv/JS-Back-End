const express = require("express");
const router=express.Router();
const homeControler=require('../controllers/homeControler');
const cubeControler=require('../controllers/cubeControler');

router.use('/',homeControler);
router.use('/cube',cubeControler);


module.exports=router;