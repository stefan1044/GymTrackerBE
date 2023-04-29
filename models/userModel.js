const db = require('../database');
const logger = require('../utils/logger');
const {Api500Error} = require('../utils/errors');


/*
    User Model
    Handles database requests related to user data.
    // TODO: Make query text be constants
 */
const UserModel = {
    getAllUsersFromDatabase: async () => {
        const query = {
            text: "SELECT * FROM users"
        };

        return db.query(query).then(queryResult => queryResult.rows);
    }, getUserById: async (id) => {
        const query = {
            text: "SELECT * FROM users WHERE user_id = $1 LIMIT 1"
        };
        const values = [id];

        return db.query(query, values).then( queryResult => queryResult.rows);
    }, getIdByUsername: async (username) => {
        const query = {
            text: "SELECT user_id FROM users WHERE user_name = $1 LIMIT 1"
        };
        const values = [username];

        return db.query(query, values).then( queryResult => queryResult.rows[0]["user_id"]);
    }, getPasswordByUsername: async (username) => {
        const query = {
            text: "SELECT password FROM users WHERE user_name = $1"
        };
        const values = [username];

        return db.query(query, values).then( queryResult => queryResult.rows[0]['password']);
    }, createUserInDatabase: async (userName, password, email) => {
        const query = {
            text: "INSERT INTO users(user_name, password, email, created_at) VALUES($1, $2, $3, NOW())"
        };
        const values = [userName, password, email];

        await db.query(query, values);
    }, modifyUsernameById: async (id, userName) => {
        const query = {
            text: "UPDATE users SET user_name = $1 WHERE user_id = $2"
        };
        const values = [userName, id];

        await db.query(query, values);
    }, modifyPasswordById: async (id, password) => {
        const query = {
            text: "UPDATE users SET password = $1 WHERE user_id = $2"
        };
        const values = [password, id];

        return db.query(query, values);
    }, modifyEmailById: async (id, email) => {
        const query = {
            text: "UPDATE users SET email = $1 WHERE user_id = $2"
        };
        const values = [email, id];

        await db.query(query, values);
    }, removeUserById: async (id) => {
        const query = {
            text: "DELETE FROM users WHERE user_id = $1"
        };
        const values = [id];

        await db.query(query, values);
    }, doesUsernameExist: async username => {
        const query = {
            text: "SELECT EXISTS (SELECT 1 FROM  users WHERE user_name = $1 LIMIT 1)",
        };
        const values = [username];

        return db.query(query, values).then(rows => {
            return rows.rows[0]['exists'];
        }).catch(e => {
            logger.error(`Error at userModel.doesUsernameExist! Error message:${e.message}\nstack:${e.stack}`);
            throw new Api500Error("Error in doesUsernameExist!");
        });
    }, doesIdExist: async id => {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  users WHERE user_id = $1 LIMIT 1)",
        };
        const values = [id];

        return db.query(query, values).then(rows => {
            return rows.rows[0]['exists'];
        }).catch(e => {
            logger.error(`Error at userModel.doesIdExist! Error message:${e.message}\nstack:${e.stack}`);
            throw new Api500Error("Error in doesIdExist!");
        });
    }
};


module.exports = UserModel;
