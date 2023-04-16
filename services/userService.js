const UserModel = require('../models/userModel');
const {compare} = require('../utils/passwordHasher');
const {Api400Error, Api404Error, InoperableApiError} = require('../utils/errorHandler');


const getAllUsers = async (config = {}) => {
    return UserModel.getAll(config).catch(e => {
        throw new InoperableApiError("Error in userService.getAllUsers");
    });
}
const getUserById = async (id, config = {}) => {
    const rows = await UserModel.getOneById(id, config).catch(e => {
        throw new InoperableApiError("Error in userService.getUserById!");
    });
    if (rows.rows.length === 0) {
        throw new Api404Error("User with provided user_id does not exist!");
    }

    return rows.rows;
}
const loginUser = async (username, password, config = {}) => {
    if (await UserModel.doesUsernameExist(username) === false) {
        return false;
    }

    const dbPassword = await UserModel.getPassword(username, config).catch(e => {
        throw new InoperableApiError("Error in userService.loginUser!");
    });

    return compare(password, dbPassword.rows[0]['password']);
}

const createUser = async (username, password, email, config = {}) => {
    if (await UserModel.doesUsernameExist(username)) {
        throw new Api400Error("Username taken!");
    }

    return UserModel.create(username, password, email, config)
}

const modifyUsername = async (id, username, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }
    if (await UserModel.doesUsernameExist(username)) {
        throw new Api400Error("Username taken!");
    }

    return UserModel.modifyUsername(id, username, config);
}
const modifyPassword = async (id, password, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }

    return UserModel.modifyPassword(id, password, config);
}
const modifyEmail = async (id, email, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }

    return UserModel.modifyEmail(id, email, config);
}

const removeUser = async (id, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Api404Error("User with id does not exist!");
    }

    return UserModel.remove(id, config);
}

module.exports = {
    getAllUsers, getUserById, loginUser, createUser, modifyUsername, modifyPassword, modifyEmail, removeUser
}