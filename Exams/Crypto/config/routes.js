const router=require('express').Router();
const homeController=require('../controllers/homeController');
const authController=require('../controllers/authController');
const dataController=require('../controllers/dataController');
const ownerController=require("../controllers/ownerDataController");


router.use('/',homeController);
router.use('/auth',authController);
router.use('/data',dataController);
router.use('/owner',ownerController);


router.use('*',(req,res)=>{
    res.render('404')
})
module.exports=router