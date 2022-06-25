const User = require("../models/User");

exports.getUserData = async (id) => {
  const userData = await User.findById(id).populate('tripsHistory').lean();
  return userData;
};

