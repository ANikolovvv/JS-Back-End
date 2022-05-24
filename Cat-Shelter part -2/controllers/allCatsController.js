const express = require("express");
const { dirname } = require("path");
const router = express.Router();
const path=require('path')

router.get("/", (req, res) => {
    let absolutePath=path.resolve(__dirname,'./views/home/index.html')
  res.sendFile(absolutePath);
  
});
module.exports = router;
