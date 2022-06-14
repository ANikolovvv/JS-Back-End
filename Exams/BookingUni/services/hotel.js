const Hotel = require("../models/Hotel");
const User = require("../models/User");

async function createHotel(hotelData) {
  const hotel = new Hotel(hotelData);
  await hotel.save();
  return hotel;
}
async function getAllHotels() {
  const hotels = await Hotel.find({}).lean();
  return hotels;
}
async function getHotelById(id) {
  const hotel = await Hotel.findById(id).lean();

  return hotel;
}
async function editHotel(id, hotelData) {
  const hotel = await Hotel.findById(id);
  hotel.name = hotelData.name;
  hotel.city = hotelData.city;
  hotel.rooms = Number(hotelData.rooms);
  hotel.imageUrl = hotelData.imageUrl;

  return hotel.save();
}
async function bookHotel(hotelId, userId) {
  //console.log(hotelId)
  const user = await User.findById(userId);
  const hotel = await Hotel.findById(hotelId);
  // console.log(`123`,hotel)
  if (user._id == hotel.owner) {
    throw new Error("Canot book hotel");
  }

  user.bookedHotels.push(hotel);
  hotel.bookedBy.push(user);

  return Promise.all([user.save(), hotel.save()]);
}
async function deleteById(id) {
  return Hotel.findByIdAndDelete(id);
}

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  editHotel,
  bookHotel,
  deleteById,
};
