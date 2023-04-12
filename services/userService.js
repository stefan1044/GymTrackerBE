const UserModel = require('../models/userModel');

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

const createUser = async (username, password, config = {}) => {
    if (await UserModel.isUsernameTaken(username)) {
        throw new Error("Username taken!");
    }
    return UserModel.create(username, password, config)
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

const removeUser = async (id, config = {}) => {
    if (await UserModel.doesIdExist(id) === false) {
        throw new Error("User with id does not exist!");
    }

    return UserModel.remove(id, config);
}

module.exports = {
    getAllUsers, getUserById, createUser, modifyUsername, modifyPassword, removeUser
}