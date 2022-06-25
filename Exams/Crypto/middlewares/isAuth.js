const jwt = require("jsonwebtoken");
const { SESSION_NAME, SECRET_TOKEN } = require("../config/env");
const { promisify } = require("util");
const jwtVerify = promisify(jwt.verify);

exports.isAuth = async (req, res, next) => {
  let token = req.cookies[SESSION_NAME];
  if (token) {
    try {
      const decodedToken = await jwtVerify(token, SECRET_TOKEN);
      req.user = decodedToken;
      res.locals.user = decodedToken;
      // console.log(decodedToken,'decoded token')
    } catch (err) {
      console.log(err);
      return res.redirect("/404");
    }
  }
  next();
};
