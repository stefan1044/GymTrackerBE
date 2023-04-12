const httpStatus = require('http-status');

const validateUser= (req, res, next) => {
    let userName = req.body['user_name'];
    let password = req.body['password'];
    if ( userName === undefined){
        res.status(httpStatus.BAD_REQUEST).send("Field user_name is not present in body of request!");
        return;
    }
    if (password === undefined){
        res.status(httpStatus.BAD_REQUEST).send("Field password is not present in body of request!");
        return;
    }
    if (userName.includes("'") || userName.includes('"') || userName.includes("\\") ||
        userName.includes("*") || userName.includes("=")){
        res.status(httpStatus.BAD_REQUEST).send("User name contains invalid characters!");
        return;
    }
    if (userName.length > 24) {
        res.status(httpStatus.BAD_REQUEST).send("User name is too long!");
        return;
    }
    if (userName.length < 6) {
        res.status(httpStatus.BAD_REQUEST).send("User name is too short!");
    }

    next()
}

module.exports = {
    validateUser
}