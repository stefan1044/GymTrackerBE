const {createToken, decodeToken} = require('../utils/jwtUtils');
const {Api500Error} =  require('../utils/errors');
const httpStatus = require('http-status')
const logger = require("../utils/logger");


// Add error handling, implementation not final
const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token){
        res.status(httpStatus.FORBIDDEN).send("No token provided!");
        return;
    }

    const message = decodeToken(token);

    if (message === null){
        res.status(httpStatus.UNAUTHORIZED).send("Unauthorized");
        return;
    }
    req.user_name = token.user_name;

    next();
};


module.exports = {
    verifyToken
};