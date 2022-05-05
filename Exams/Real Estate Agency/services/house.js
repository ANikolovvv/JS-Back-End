const House = require("../model/House");

async function createHouse(houseData) {
  const pattern = new RegExp(`^${houseData.name}$`, "i");
  const existing = await House.findOne({ name: { $regex: pattern } });
  if (existing) {
    throw new Error("house alredy exist!");
  }
  const house = new House(houseData);
  await house.save();
  return house;
}
async function getHouseById(id) {
  const house = await House.findById(id).lean();
  return house;
}
async function getAllHouses() {
  return await House.find({}).lean();
}
async function editHouse(id, dataHouse) {
  const house = await House.findById(id);

  (house.name = dataHouse.name),
    (house.type = dataHouse.type),
    (house.year = dataHouse.year),
    (house.city = dataHouse.city),
    (house.homeImage = dataHouse.homeImage),
    (house.propertyDescription = dataHouse.propertyDescription),
    (house.availablePieces = dataHouse.availablePieces);
  house.rentedAHome = dataHouse.rentedAHome;

  await house.save();
  return house;
}
async function addHouse(houseId, userData) {
  // const user=await User.findById(userId);
  const house = await House.findById(houseId);

  house.availablePieces = house.availablePieces - 1;
  console.log(house.availablePieces);
  house.rentedAHome.push(userData);
  return house.save();
}
async function deleteHouse(id) {
  return House.findByIdAndDelete(id);
}
async function searchByType(type) {
  const regExp = new RegExp(`^${type}$`, "i");
  const match = await House.find({ type: { $regex: regExp } }).lean();

  return match;
}

module.exports = {
  createHouse,
  getHouseById,
  getAllHouses,
  editHouse,
  deleteHouse,
  addHouse,
  searchByType,
};
