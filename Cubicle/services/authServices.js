const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { saltRounds, secret, sessionName } = require("../env");
const User = require("../models/User");

exports.register = async ({ username, password, repeatPassword }) => {
  if (password !== repeatPassword) {
    return false;
  }
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const createUser = User.create({
    username,
    password: hashPassword,
  });
  return createUser;
};

exports.login = async ({ username, password }) => {
  let user = await User.findOne({ username });

  if (!user) {
    return;
  }
  const validatePass = await bcrypt.compare(password, user.password);
  if (!validatePass) {
    return;
  }
  let result = new Promise((resolve, reject) => {
    jwt.sign(
      { _id: user._id, username: user.username },
      secret,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      }
    );
  });
  return result;
};
