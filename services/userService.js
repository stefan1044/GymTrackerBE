const UserModel = require('../models/userModel');
const {config} = require("dotenv");
// TODO: Catch errors from User.Model!
const getAllUsers = async (config = {}) => {
    return UserModel.getAll(config);
}
const getUserById = async (id, config = {}) => {
    const rows = await UserModel.getOneById(id, config);

    if (rows.rows.length === 0) {
        throw new Error("User with provided user_id does not exist!");
    }
    return rows;
}
const loginUser = async (username, password, config = {}) => {
    const ok = await UserModel.login(username, password, config).catch(e => {
        throw new Error("Error in userService.loginUser!");
    });


    // should return some kind of token here
    return ok;
}

const createUser = async (username, password, email, config = {}) => {
    if (await UserModel.isUsernameTaken(username)) {
        throw new Error("Username taken!");
    }

    return UserModel.create(username, password, email, config)
}

const modifyUsername = async (id, username, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Error("User with id does not exist!");
    }
    if (await UserModel.isUsernameTaken((username))) {
        throw new Error("Username taken!");
    }

    return UserModel.modifyUsername(id, username, config);
}
const modifyPassword = async (id, password, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Error("User with id does not exist!");
    }

    return UserModel.modifyPassword(id, password, config);
}
const modifyEmail = async (id, email, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Error("User with id does not exist!");
    }

    return UserModel.modifyEmail(id, email, config);
}

const removeUser = async (id, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Error("User with id does not exist!");
    }

    return UserModel.remove(id, config);
}

module.exports = {
    getAllUsers, getUserById, loginUser, createUser, modifyUsername, modifyPassword, modifyEmail, removeUser
}