const httpStatus = require('http-status');
const userService = require('../services/userService');


const createUser = async (req, res, next) => {
    await userService.createUser(req.body['user_name'], req.body['password'], req.body['email']).then(rows => {
        res.status(httpStatus.CREATED).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.BAD_REQUEST) {
            res.status(httpStatus.BAD_REQUEST).send("Username is already taken!");
            //e.message = "Username is already taken!";
            //next(e);
        } else {
            res.status(httpStatus.NOT_FOUND).send("Error when creating user!");
            console.log(e.message, e.stack);
            //next(e);
        }
    });
}

const readUsers = async (req, res, next) => {
    await userService.getAllUsers().then(rows => {
        res.status(httpStatus.OK).json(rows.rows);
    }).catch(e => {
        res.status(httpStatus.NOT_FOUND).send("Error when getting all users!");
        console.log(e.message, e.stack);
        //next(e);
    });
}
const readUserById = async (req, res, next) => {
    await userService.getUserById(req.params.id).then(rows => {
        res.status(httpStatus.OK).json(rows);
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            res.status(httpStatus.NOT_FOUND).send("User with provided user_id does not exist!");
            //e.message = "User with provided user_id does not exist!";
            //next(e);
        } else {
            res.status(httpStatus.NOT_FOUND).send("Error when getting user!");
            console.log(e.message, e.stack);
            //next(e);
        }
    })
}

const updateUsername = async (req, res, next) => {
    await userService.modifyUsername(req.params.id, req.body['user_name']).then(rows => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            res.status(httpStatus.NOT_FOUND).send("User with provided user_id does not exist!");
            //e.message = "User with provided user_id does not exist!";
            //next(e)

        } else if (e.statusCode === httpStatus.BAD_REQUEST) {
            res.status(httpStatus.NOT_FOUND).send("Username is already taken!");
            //e.message = "Username is already taken!";
            //next(e);
        } else {
            res.status(httpStatus.NOT_FOUND).send("Error when modifying user username!");
            console.log(e.message, e.stack);
            //next(e);
        }
    });
}
const updatePassword = async (req, res, next) => {
    await userService.modifyPassword(req.params.id, req.body['password']).then(rows => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            res.status(httpStatus.NOT_FOUND).send("User with provided user_id does not exist!");
            //e.message = "User with provided user_id does not exist!";
            //next(e)
        } else {
            res.status(httpStatus.NOT_FOUND).send("Error when modifying user password!");
            console.log(e.message, e.stack);
            //next(e)
        }
    });
}
const updateEmail = async (req, res, next) => {
    await userService.modifyEmail(req.params.id, req.body['email']).then(rows => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            res.status(httpStatus.NOT_FOUND).send("User with provided user_id does not exist!");
            //e.message = "User with provided user_id does not exist!";
            //next(e)
        } else {
            res.status(httpStatus.NOT_FOUND).send("Error when modifying user email!");
            console.log(e.message, e.stack);
            //next(e)
        }
    });
}

const deleteUser = async (req, res, next) => {
    await userService.removeUser(req.params.id).then(rows => {
        res.status(httpStatus.OK).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            res.status(httpStatus.NOT_FOUND).send("User with provided user_id does not exist!");
            //e.message = "User with provided user_id does not exist!";
            //next(e)
        } else {
            res.status(httpStatus.NOT_FOUND).send("Error when deleting user!");
            console.log(e.message, e.stack);
            //next(e)
        }
    });
}

const loginUser = async (req, res, next) => {
    await userService.loginUser(req.body['user_name'], req.body['password']).then(ok => {
        if (ok) {
            res.status(httpStatus.OK).send("Logged in!");
        } else {
            res.status(httpStatus.NOT_FOUND).send("Invalid username or password!");
        }
    }).catch(e => {
        res.status(httpStatus.NOT_FOUND).send("Error when logging in!");
        console.log(e, e.stack);
        //next(e);
    });
}

module.exports = {
    createUser, readUsers, readUserById, updateUsername, updatePassword, deleteUser, loginUser, updateEmail
}