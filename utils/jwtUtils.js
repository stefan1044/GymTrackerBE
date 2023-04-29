const jwt = require('jsonwebtoken');
const {Api500Error} =  require('./errors');
const logger = require("./logger");


const jwtKey = process.env.JWT_SECRET;

// TODO: Implementation is not final
const createToken = payload => {
    return jwt.sign(payload, jwtKey);
};

const decodeToken = token => {
    return jwt.decode(token, jwtKey);
};


module.exports = {
    createToken, decodeToken
};
