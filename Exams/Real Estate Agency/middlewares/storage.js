const house=require('../services/house');

module.exports=()=>(req,res,next)=>{
      req.storage={
         ...house   
      };
      next();
};