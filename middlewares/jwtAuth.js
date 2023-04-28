const {createToken, decodeToken} = require('../utils/jwtUtils');
const {Api500Error} =  require('../utils/errors');
const httpStatus = require('http-status')
const logger = require("../utils/logger");


// Add error handling, implementation not final
const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token){
        res.status(httpStatus.FORBIDDEN).send("No token provided!");
        return;
    }

    try {
        const message = decodeToken(token);
        if (message === null) {
            res.status(httpStatus.UNAUTHORIZED).send("Unauthorized");
            return;
        }
        req.user_id = message;

        next();
    } catch (e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Error decoding token");

        next(e);
    }

};


module.exports = {
    verifyToken
};