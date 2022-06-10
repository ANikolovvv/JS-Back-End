
const jwt = require('jsonwebtoken');
const {promisify}  = require('util');
const { sessionName, secret } = require('../env');

const jwtVerify=promisify(jwt.verify);

exports.auth=async (req,res,next)=>{
    let token = req.cookies[sessionName];
   // console.log(token,'ressdfdsf')
    if (token) {
        try {
            let decodedToken = await jwtVerify(token, secret);

            req.user = decodedToken;
            res.locals.user = decodedToken;
        } catch(err) {
            console.log(err);
            return res.redirect('/404');
        }
    }

    next();
}
exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/');
    }

    next();
};