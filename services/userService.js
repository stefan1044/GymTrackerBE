const UserModel = require('../models/userModel');
const logger = require('../utils/logger');
const {compare} = require('../utils/passwordHasher');
const {Api400Error, Api404Error, InoperableApiError, Api500Error} = require('../utils/errors');


const getAllUsers = async (config = {}) => {
    return UserModel.getAll(config).catch(e => {
        logger.error(`Error in userService.getAllUsers! Error message:${e.message}\nstack:${e.stack}`);
        throw new InoperableApiError("Error in userService.getAllUsers");
    });
};
const getUserById = async (id, config = {}) => {
    const rows = await UserModel.getOneById(id, config).catch(e => {
        logger.error(`Error in userService.getUserById! Error message:${e.message}\nstack:${e.stack}`);
        throw new InoperableApiError("Error in userService.getUserById!");
    });
    if (rows.rows.length === 0) {
        throw new Api404Error("User with provided user_id does not exist!");
    }

    return rows.rows;
};
const loginUser = async (username, password, config = {}) => {
    if (await UserModel.doesUsernameExist(username) === false) {
        return -1;
    }

    const dbPassword = await UserModel.getPassword(username, config).catch(e => {
        logger.error("Error in userService.loginUser! Error message:${e.message}\nstack:${e.stack}");
        throw new InoperableApiError("Error in userService.loginUser!");
    });
    if(compare(password, dbPassword.rows[0]['password'])){
         const userId = await UserModel.getIdByUsername(username).catch(e => {
            logger.error(`Error in userService.loginUser! Error message:${e.message}\nstack:${e.stack}`);
            throw new Api500Error("Error in userService.loginUser!");
        });

        return userId.rows[0]["user_id"];
    } else{
        return -1;
    }
};

const createUser = async (username, password, email, config = {}) => {
    if (await UserModel.doesUsernameExist(username)) {
        throw new Api400Error("Username taken!");
    }

    return UserModel.create(username, password, email, config)
};

const modifyUsername = async (id, username, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }
    if (await UserModel.doesUsernameExist(username)) {
        throw new Api400Error("Username taken!");
    }

    return UserModel.modifyUsername(id, username, config);
};
const modifyPassword = async (id, password, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }

    return UserModel.modifyPassword(id, password, config);
};
const modifyEmail = async (id, email, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }

    return UserModel.modifyEmail(id, email, config);
};

const removeUser = async (id, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }

    return UserModel.remove(id, config);
};

module.exports = {
    getAllUsers, getUserById, loginUser, createUser, modifyUsername, modifyPassword, modifyEmail, removeUser
};
