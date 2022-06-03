module.exports=async(req,res)=>{
    let cubes=await req.storage.getAll();
    const ctx={
        title: 'Cubicle',
        cubes,
        search:req.query.search ||'',
        from:req.query.from || '',
        to:req.query.to || ''
    };
    console.log('catalog')
    res.render('index',ctx);
}