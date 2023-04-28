const httpStatus = require('http-status');
const userService = require('../services/userService');
const {createToken} = require('../utils/jwtUtils');
const {Api500Error} = require("../utils/errors");


const createUser = async (req, res, next) => {
    await userService.createUser(req.body['user_name'], req.body['password'], req.body['email']).then(rows => {
        res.status(httpStatus.CREATED).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.BAD_REQUEST) {
            e.message = "Username is already taken!";
            next(e);
        } else {
            next(e);
        }
    });
};

const readUsers = async (req, res, next) => {
    await userService.getAllUsers().then(rows => {
        res.status(httpStatus.OK).json(rows.rows);
    }).catch(e => {
        next(e);
    });
};
const readUserById = async (req, res, next) => {
    await userService.getUserById(req.params.id).then(rows => {
        res.status(httpStatus.OK).json(rows);
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            e.message = "User with provided user_id does not exist!";
            next(e);
        } else {
            next(e);
        }
    })
};

const updateUsername = async (req, res, next) => {
    await userService.modifyUsername(req.user_id, req.body['user_name']).then(rows => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            e.message = "User with provided user_id does not exist!";
            next(e)
        } else if (e.statusCode === httpStatus.BAD_REQUEST) {
            e.message = "Username is already taken!";
            next(e);
        } else {
            next(e);
        }
    });
};
const updatePassword = async (req, res, next) => {
    await userService.modifyPassword(req.user_id, req.body['password']).then(rows => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            e.message = "User with provided user_id does not exist!";
            next(e)
        } else {
            next(e)
        }
    });
};
const updateEmail = async (req, res, next) => {
    await userService.modifyEmail(req.user_id, req.body['email']).then(rows => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            e.message = "User with provided user_id does not exist!";
            next(e)
        } else {
            next(e)
        }
    });
};

const deleteUser = async (req, res, next) => {
    await userService.removeUser(req.params.id).then(rows => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            e.message = "User with provided user_id does not exist!";
            next(e)
        } else {
            next(e)
        }
    });
};

// Review token creation process
const loginUser = async (req, res, next) => {
    await userService.loginUser(req.body['user_name'], req.body['password']).then(userId => {
        if (userId === -1) {
            res.status(httpStatus.NOT_FOUND).send("Invalid username or password!");
        } else {
            try {
                const token = createToken(userId);
                res.status(httpStatus.OK).json({
                    message: "Logged in!",
                    token: token
                });
            } catch (e) {
                throw new Api500Error("Error when creating token!");
            }
        }
    }).catch(e => {
        next(e);
    });
};


module.exports = {
    createUser, readUsers, readUserById, updateUsername, updatePassword, deleteUser, loginUser, updateEmail
};
