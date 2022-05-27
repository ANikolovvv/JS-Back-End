const create={
    getCreate:async (req,res)=>{
        res.render('create')
    },
    postCreate:async (req,res)=>{
        console.log(req.body.name);
        const cube={
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficultyLevel: req.body.difficultyLevel,
        }
        await req.storage.createCube(cube)
        console.log('post')
        res.redirect("/");
    }
}
module.exports=create;