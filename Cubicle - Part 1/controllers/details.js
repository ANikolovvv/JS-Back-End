module.exports=async(req,res)=>{
    let cube=await req.storage.getById(req.params.id);

    const ctx={
        cube
    }
    console.log('details',ctx);

    res.render('details',ctx)
    
}