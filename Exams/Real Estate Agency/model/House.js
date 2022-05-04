const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  type:{type:String,require:true,enum:['Apartment','Villa','House']},
  year: { type: Number, required: true },
  city: { type: String, required: true },
  homeImage: { type: String, required: true ,match: [/^https?/,'Image must be http or https']},
  propertyDescription: { type: String, required: true ,maxlength:60},
  availablePieces: { type: Number, required: true ,min:0,max:10},
  rentedAHome: [{ type: Schema.Types.String, ref: "User", default: [] }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});
//min: [6,'The Name should be at least 6 characters']
//(“Apartment”, “Villa”, “House”) 
module.exports = model("House", schema);
