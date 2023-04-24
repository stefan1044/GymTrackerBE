const jwt = require('jsonwebtoken');
const {Api500Error} =  require('./errors');
const logger = require("./logger");

const jwtKey = process.env.JWT_SECRET;

// TODO: Verify way errors are thrown here, implementation is not final
const createToken = payload => {
    let token = undefined;

    try {
        token = jwt.sign(payload, jwtKey);
    } catch (e){
        logger.error(`Error in jwtUtils.createToken! Error message:${e.message}\nstack:${e.stack}`);
        throw new Api500Error(`Error in jwtUtils.createToken!`);
    }

    return token;
};

const decodeToken = token => {
    let message = undefined;

    try {
        message = jwt.decode(token, jwtKey);
    } catch (e){
        logger.error(`Error in jwtUtils.decodeToken! Error message:${e.message}\nstack:${e.stack}`);
        throw new Api500Error(`Error in jwtUtils.decodeToken!`);
    }

    return message;
};


module.exports = {
    createToken, decodeToken
};