const UserModel = require('../models/userModel');
const logger = require('../utils/logger');
const {compare, encrypt} = require('../utils/passwordHasher');
const {Api400Error, Api404Error, InoperableApiError, Api500Error} = require('../utils/errors');


const getAllUsers = async () => {
    return UserModel.getAll().catch(e => {
        logger.error(`Error in userService.getAllUsers! Error message:${e.message}\nstack:${e.stack}`);
        throw new Api500Error("Error in userService.getAllUsers");
    });
};
const getUserById = async (id) => {
    const user = await UserModel.getOneById(id).catch(e => {
        logger.error(`Error in userService.getUserById! Error message:${e.message}\nstack:${e.stack}`);
        throw new Api500Error("Error in userService.getUserById!");
    });
    if (user.length === 0) {
        throw new Api404Error("User with provided user_id does not exist!");
    }

    return user;
};
// TODO: FIX, currently not working
const loginUser = async (username, password) => {
    if (await UserModel.doesUsernameExist(username) === false) {
        return -1;
    }

    const dbPassword = await UserModel.getPassword(username).catch(e => {
        logger.error(`Error in userService.loginUser! Error message:${e.message}\nstack:${e.stack}`);
        throw new Api500Error("Error in userService.loginUser!");
    });
    if(compare(password, dbPassword)){
        console.log("HERE");
        return await UserModel.getIdByUsername(username).catch(e => {
            logger.error(`Error in userService.loginUser! Error message:${e.message}\nstack:${e.stack}`);
            throw new Api500Error("Error in userService.loginUser!");
        });
    } else{
        console.log("-1");
        return -1;
    }
};

const createUser = async (username, password, email) => {
    if (await UserModel.doesUsernameExist(username)) {
        throw new Api400Error("Username taken!");
    }
    try {
        password = await encrypt(password);
    } catch (e){
        logger.error(`Error when trying to encrypt password! Error message:${e.message}\nstack:${e.stack}`);
        throw new Api500Error("Error in userService.createUser!");
    }

    return UserModel.create(username, password, email)
};

const modifyUsername = async (id, username) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }
    if (await UserModel.doesUsernameExist(username)) {
        throw new Api400Error("Username taken!");
    }

    return UserModel.modifyUsername(id, username);
};
const modifyPassword = async (id, password) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }
    try {
        password = await encrypt(password);
    } catch (e){
        logger.error(`Error when trying to encrypt password! Error message:${e.message}\nstack:${e.stack}`);
        throw new Api500Error("Error in userService.createUser!");
    }

    return UserModel.modifyPassword(id, password);
};
const modifyEmail = async (id, email) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }

    return UserModel.modifyEmail(id, email);
};

const removeUser = async (id) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }

    return UserModel.remove(id);
};

module.exports = {
    getAllUsers, getUserById, loginUser, createUser, modifyUsername, modifyPassword, modifyEmail, removeUser
};
