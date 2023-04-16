const httpStatus = require('http-status');
const userService = require('../services/userService');

const createUser = async (req, res) => {
    await userService.createUser(req.body['user_name'], req.body['password'], req.body['email']).then((rows) => {
        res.status(httpStatus.CREATED).send();
    }).catch(e => {
        if (e.message === "Username taken!") {
            res.status(httpStatus.BAD_REQUEST).send("Username is already taken!");
            return;
        }

        res.status(httpStatus.NOT_FOUND).send("Error when creating user!");
        console.log(e, e.stack);
    })
}

const readUsers = async (req, res) => {
    await userService.getAllUsers().then((rows) => {
        res.status(httpStatus.OK).json(rows.rows);
    }).catch(e => {
        res.status(httpStatus.NOT_FOUND).send("Error when getting all users!");
        console.log(e, e.stack);
    })
}
const readUserById = async (req, res) => {
    await userService.getUserById(req.params.id).then(rows => {
        res.status(httpStatus.OK).json(rows);
    }).catch(e => {
        if (e.message === "User with provided user_id does not exist!") {
            res.status(httpStatus.NOT_FOUND).send("User with provided user_id does not exist!");
            return;
        }

        res.status(httpStatus.NOT_FOUND).send("Error when getting user!");
        console.log(e, e.stack);
    })
}

const updateUsername = async (req, res) => {
    await userService.modifyUsername(req.params.id, req.body['user_name']).then((rows) => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.message === "User with id does not exist!") {
            res.status(httpStatus.NOT_FOUND).send("User with provided user_id does not exist!");
            return;
        }
        if (e.message === "Username taken!") {
            res.status(httpStatus.NOT_FOUND).send("Username is already taken!");
            return;
        }

        res.status(httpStatus.NOT_FOUND).send("Error when modifying user username!");
        console.log(e, e.stack);
    })
}
const updatePassword = async (req, res) => {
    await userService.modifyPassword(req.params.id, req.body['password']).then((rows) => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.message === "User with id does not exist!") {
            res.status(httpStatus.NOT_FOUND).send("User with provided user_id does not exist!");
            return;
        }

        res.status(httpStatus.NOT_FOUND).send("Error when modifying user password!");
        console.log(e, e.stack);
    })
}
const updateEmail = async (req, res) => {
    await userService.modifyEmail(req.params.id, req.body['email']).then((rows) => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.message === "User with id does not exist!") {
            res.status(httpStatus.NOT_FOUND).send("User with provided user_id does not exist!");
            return;
        }

        res.status(httpStatus.NOT_FOUND).send("Error when modifying user email!");
        console.log(e, e.stack);
    })
}

const deleteUser = async (req, res) => {
    await userService.removeUser(req.params.id).then((rows) => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.message === "User with id does not exist!") {
            res.status(httpStatus.NOT_FOUND).send("User with provided user_id does not exist!");
            return;
        }

        res.status(httpStatus.NOT_FOUND).send("Error when deleting user!");
        console.log(e, e.stack);
    })
}

const loginUser = async (req, res) => {
    await userService.loginUser(req.body['user_name'], req.body['password']).then(ok => {
        if (!ok) {
            res.status(httpStatus.NOT_FOUND).send("Invalid username or password!");
        } else {
            res.status(httpStatus.OK).send("Logged in!");
        }
    }).catch(e => {
        if (e.message === "User with provided username does not exist!") {
            res.status(httpStatus.NOT_FOUND).send("Invalid username or password");
            return;
        }

        res.status(httpStatus.NOT_FOUND).send("Error when logging in!");
        console.log(e, e.stack);
    })
}

module.exports = {
    createUser, readUsers, readUserById, updateUsername, updatePassword, deleteUser, loginUser, updateEmail
}