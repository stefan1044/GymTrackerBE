const httpStatus = require('http-status');

const validateUsername = (req, res, next) => {
    let userName = req.body['user_name'];
    if (userName === undefined) {
        res.status(httpStatus.BAD_REQUEST).send("Field user_name is not present in body of request!");
        return;
    }
    if (userName.length < 6) {
        res.status(httpStatus.BAD_REQUEST).send("User name is too short!");
    }
    if (userName.length > 24) {
        res.status(httpStatus.BAD_REQUEST).send("User name is too long!");
        return;
    }
    if (userName.includes("'") || userName.includes('"') || userName.includes("\\") || userName.includes("*") || userName.includes("=")) {
        res.status(httpStatus.BAD_REQUEST).send("User name contains invalid characters!");
        return;
    }

    next();
}

const validatePassword = (req, res, next) => {
    let password = req.body['password'];
    if (password === undefined) {
        res.status(httpStatus.BAD_REQUEST).send("Field password is not present in body of request!");
        return;
    }
    if (password.length < 6) {
        res.status(httpStatus.BAD_REQUEST).send("Password is too short!");
    }
    if (password.length > 32) {
        res.status(httpStatus.BAD_REQUEST).send("Password is too long!");
    }
    if (password.includes("'") || password.includes('"') || password.includes("\\") || password.includes("*") || password.includes("=")) {
        res.status(httpStatus.BAD_REQUEST).send("User name contains invalid characters!");
        return;
    }

    next()
}

module.exports = {
    validatePassword, validateUsername
}