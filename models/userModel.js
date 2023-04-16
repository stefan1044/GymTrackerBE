const db = require("../database");
const {encrypt} = require("../utils/passwordHasher");

const UserModel = {
    getAll: async function (config = {}) {
        const query = {
            text: "SELECT * FROM users", ...config
        }

        return db.query(query);
    }, getOneById: async function (id, config = {}) {
        const query = {
            text: "SELECT * FROM users WHERE user_id = $1 LIMIT 1", ...config
        }
        const values = [id];

        return db.query(query, values);
    }, getPassword: async function (username, config = {}) {
        const query = {
            text: "SELECT password FROM users WHERE user_name = $1", ...config
        }
        const values = [username];

        return db.query(query, values);
    }, create: async function (userName, password, email, config = {}) {
        // TODO: Error handle password encryption
        password = await encrypt(password);
        const query = {
            text: "INSERT INTO users(user_name, password, email, created_at) VALUES($1, $2, $3, NOW())", ...config
        }
        const values = [userName, password, email];

        return db.query(query, values);
    }, modifyUsername: async function (id, userName, config = {}) {
        let query = {
            text: "UPDATE users SET user_name = $1 WHERE user_id = $2", ...config
        };
        const values = [userName, id]

        return db.query(query, values);
    }, modifyPassword: async function (id, password, config = {}) {
        let query = {
            text: "UPDATE users SET password = $1 WHERE user_id = $2", ...config
        }
        const values = [password, id];

        return db.query(query, values);
    }, modifyEmail: async function (id, email, config = {}) {
        let query = {
            text: "UPDATE users SET email = $1 WHERE user_id = $2", ...config
        }
        const values = [email, id];

        return db.query(query, values);
    }, remove: async function (id, config = {}) {
        let query = {
            text: "DELETE FROM users WHERE user_id = $1", ...config
        }
        const values = [id];

        return db.query(query, values);
    }, isUsernameTaken: async function (username) {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  users WHERE user_name = $1 LIMIT 1)",
        }
        const values = [username];

        return db.query(query, values).then((rows) => {
            return rows.rows[0]['exists'];
        }).catch(e => {
            console.log(e.message)
            throw new Error("Error in isUsernameTaken!");
        });
    }, doesIdExist: async function (id) {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  users WHERE user_id = $1 LIMIT 1)",
        }
        const values = [id];

        return db.query(query, values).then((rows) => {
            return rows.rows[0]['exists'];
        }).catch(e => {
            console.log(e.message);
            throw new Error("Error in doesIdExist!");
        });
    }
}

module.exports = UserModel;