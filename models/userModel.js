const db = require('../database');
const logger = require('../utils/logger');
const {encrypt} = require('../utils/passwordHasher');
const {Api500Error} = require('../utils/errors');

/*
    User Model
    Handles database requests related to user data.
 */
const UserModel = {
    getAll: async (config = {}) => {
        const query = {
            text: "SELECT * FROM users", ...config
        };

        return db.query(query);
    }, getOneById: async (id, config = {}) => {
        const query = {
            text: "SELECT * FROM users WHERE user_id = $1 LIMIT 1", ...config
        };
        const values = [id];

        return db.query(query, values);
    }, getPassword: async (username, config = {}) => {
        const query = {
            text: "SELECT password FROM users WHERE user_name = $1", ...config
        };
        const values = [username];

        return db.query(query, values);
    }, create: async (userName, password, email, config = {}) => {
        try {
            password = await encrypt(password);
        } catch (e){
            logger.error(`Error when trying to encrypt password! Error message:${e.message}\nstack:${e.stack}`);
            throw new Api500Error("Error in userModel.create!");
        }
        const query = {
            text: "INSERT INTO users(user_name, password, email, created_at) VALUES($1, $2, $3, NOW())", ...config
        };
        const values = [userName, password, email];

        return db.query(query, values);
    }, modifyUsername: async (id, userName, config = {}) => {
        let query = {
            text: "UPDATE users SET user_name = $1 WHERE user_id = $2", ...config
        };
        const values = [userName, id]

        return db.query(query, values);
    }, modifyPassword: async (id, password, config = {}) => {
        let query = {
            text: "UPDATE users SET password = $1 WHERE user_id = $2", ...config
        };
        const values = [password, id];

        return db.query(query, values);
    }, modifyEmail: async (id, email, config = {}) => {
        let query = {
            text: "UPDATE users SET email = $1 WHERE user_id = $2", ...config
        };
        const values = [email, id];

        return db.query(query, values);
    }, remove: async (id, config = {}) => {
        let query = {
            text: "DELETE FROM users WHERE user_id = $1", ...config
        };
        const values = [id];

        return db.query(query, values);
    }, doesUsernameExist: async username => {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  users WHERE user_name = $1 LIMIT 1)",
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
