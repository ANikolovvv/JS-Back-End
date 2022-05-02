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
  const house = await House.findById(id).lean();

    house.name = dataHouse.name,
    house.type = dataHouse.type,
    house.year = dataHouse.year,
    house.city = dataHouse.city,
    house.homeImage = dataHouse.homeImage,
    house.propertyDescription = dataHouse.propertyDescription,
    house.availablePieces = dataHouse.availablePieces;

    return house.save()
}
async function deleteHouse(id) {
    return House.findByIdAndDelete(id)
}

module.exports={
    createHouse,
    getHouseById,
    getAllHouses,
    editHouse,
    deleteHouse
}
