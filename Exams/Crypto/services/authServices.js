const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SALT_ROUNDS, SECRET_TOKEN } = require("../config/env");

const User = require("../models/User");

exports.register = async ({ username, email, password, rePass }) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({
    username,
    email,
    password: hash,
  });

  return createToken(user);
};
exports.login = async ({ email, password }) => {
  let user = await User.findOne({ email });
  //console.log('user',user)
  // console.log('user',username)
  ///console.log('user',password)
  if (!user) {
    throw new Error(`Email or password doesn't exist`);
  }
  const validatePass = await bcrypt.compare(password, user.password);
  if (!validatePass) {
    throw {
      message: "Invalid email or password",
    };
  }
  return createToken(user);
};
function createToken(user) {
  let token = new Promise((resolve, reject) => {
    jwt.sign(
      { _id: user._id, email: user.email },
      SECRET_TOKEN,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      }
    );
  });
  return token;
}
