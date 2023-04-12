const db = require("../database");

const UserModel = {
    getAll: async function (config = {}) {
        let query = {
            text: "SELECT * FROM users"
        }
        query = {...query, ...config};

        return db.query(query);
    }, getOneById: async function (id, config = {}) {
        let query = {
            text: "SELECT * FROM users WHERE user_id = $1 LIMIT 1", values: [id]
        }
        query = {...query, ...config};
        return db.query(query);
    }, create: async function (userName, password, config = {}) {
        let query = {
            text: "INSERT INTO users(user_name, password, created_at) VALUES($1, $2, NOW())",
            values: [userName, password]
        }
        query = {...query, ...config};

        return db.query(query);
    }, modifyUsername: async function (id, userName, config = {}) {
        let query = {
            text: "UPDATE users SET user_name = $1 WHERE user_id = $2", values: [userName, id]
        }
        query = {...query, ...config};

        return db.query(query);
    }, modifyPassword: async function (id, password, config = {}) {
        let query = {
            text: "UPDATE users SET password = $1 WHERE user_id = $2", values: [password, id]
        }
        query = {...query, ...config};

        return db.query(query);
    }, remove: async function (id, config = {}) {
        let query = {
            text: "DELETE FROM users WHERE user_id = $1", values: [id]
        }
        query = {...query, ...config};

        return db.query(query);
    }, isUsernameTaken: async function (username) {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  users WHERE user_name = $1 LIMIT 1)", values: [username]
        }

        return db.query(query).then((rows) => {
            return rows.rows.length === 1;
        }).catch(e => {
            throw new Error("Error in isUsernameTaken!");
        })
    }, doesIdExist: async function (id) {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  users WHERE user_id = $1 LIMIT 1)", values: [id]
        }

        return db.query(query).then((rows) => {
            return rows.rows[0]['exists'];
        }).catch(e => {
            console.log("here")
            throw new Error("Error in doesIdExist!");
        })

    }
}

module.exports = UserModel;