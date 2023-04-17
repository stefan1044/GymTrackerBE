const httpStatus = require('http-status');


const validateUsername = async (req, res, next) => {
    let userName = req.body['user_name'];
    if (userName === undefined) {
        res.status(httpStatus.BAD_REQUEST).send("Field user_name is not present in body of request!");
        return;
    }
    if (userName.length < 6) {
        res.status(httpStatus.BAD_REQUEST).send("User name is too short!");
        return;
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
};

const validatePassword = async (req, res, next) => {
    let password = req.body['password'];
    if (password === undefined) {
        res.status(httpStatus.BAD_REQUEST).send("Field password is not present in body of request!");
        return;
    }
    if (password.length < 6) {
        res.status(httpStatus.BAD_REQUEST).send("Password is too short!");
        return;
    }
    if (password.length > 32) {
        res.status(httpStatus.BAD_REQUEST).send("Password is too long!");
        return;
    }
    if (password.includes("'") || password.includes('"') || password.includes("\\") || password.includes("*") || password.includes("=")) {
        res.status(httpStatus.BAD_REQUEST).send("User name contains invalid characters!");
        return;
    }

    next()
};

const validateEmail = async (req, res, next) => {
    const email = req.body['email'];
    if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        res.status(httpStatus.BAD_REQUEST).send("Invalid email");
        return;
    }

    next();
};


module.exports = {
    validatePassword, validateUsername, validateEmail
};
