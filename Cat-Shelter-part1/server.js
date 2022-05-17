const data=require("./data.json");
const fs=require('fs/promises');
const saveCat=(cat)=>{
    data.cats.push(cat);
   let body=JSON.stringify(data,'',2);
  return fs.writeFile("./data.json",body);
}
const saveBreed=(breed)=>{
    data.breeds.push(breed);
   let body=JSON.stringify(data,'',2);
  return fs.writeFile("./data.json",body);
}

const storageServer={
    saveCat,
    saveBreed
}
module.exports=storageServer