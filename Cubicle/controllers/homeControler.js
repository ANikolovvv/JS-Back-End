const router=require("express").Router();
const cubeServices=require('../services/cubeServices')

router.get('/',async(req,res)=>{
    let { search, from, to } = req.query;

    const cubes=await cubeServices.getAll(search,from,to);
   
    res.render('index',{cubes})
})
router.get('/about',(req,res)=>{
    res.render('about')
})



module.exports=router;