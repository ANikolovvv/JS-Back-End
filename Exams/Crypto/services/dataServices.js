const Crypto = require("../models/Crypto");
const User = require("../models/User");

exports.createData = async (data, userId) => {
  let userdata = await User.findById(userId);
  data.owner = userId;
  let myData = await Crypto.create(data);
  console.log(myData, "create crypto");
};
exports.getData = async (id) => {
  let house = await Crypto.findById(id).populate("buyAcrypto").lean();
  try {
    return house;
  } catch (err) {
    console.log(error, "error id");
  }
};
exports.shareData = async (id, user) => {
  let crypto = await Crypto.findById(id);
  console.log("share");
  crypto.buyAcrypto.push(user);

  crypto.save();
};
exports.getAll = async () => {
  return await Crypto.find({}).lean();
};
exports.updateData = async (data, id, userId) => {
  data.owner = userId;
  await Crypto.findByIdAndUpdate(id, data);
};
exports.deleteData = async (id) => {
  await Crypto.findByIdAndDelete(id);
};
exports.searchData = async (payment) => {
  const regExpPay = new RegExp(`^${payment}$`, "i");
  return await Crypto.find({ payment: { $regex: regExpPay } }).lean();
};
exports.searchName = async (name) => {
  const regExpPay = new RegExp(`^${name}$`, "i");
  return await Crypto.find({ name: { $regex: regExpPay } }).lean();
};
