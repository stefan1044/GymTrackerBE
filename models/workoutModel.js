const db = require("../database");

const WorkoutModel = {
    getAllFromUser: async function (userName, config = {}) {
        let query = {
            text: "SELECT * FROM workouts WHERE user_id = $1", values: [userName]
        }
        query = {...query, ...config};

        return db.query(query);
    }, getOneById: async function (id, config = {}) {
        let query = {
            text: "SELECT * FROM workouts WHERE workout_id = $1 LIMIT 1", values: [id]
        }
        query = {...query, ...config};
        return db.query(query);
    }, create: async function (userId, completedAt, duration, exercises, config = {}) {
        let query = {
            text: "INSERT INTO workouts(user_id, completed_at, duration, exercises) VALUES($1, $2, $3, $4)",
            values: [userId, completedAt, duration, exercises]
        }
        query = {...query, ...config};

        return db.query(query);
    }, doesWorkoutIdExist: async function (id) {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  workouts WHERE workout_id = $1 LIMIT 1)", values: [id]
        }

        return db.query(query).then((rows) => {
            return rows.rows[0]['exists'];
        }).catch(e => {
            console.log(e.message);
            throw new Error("Error in doesWorkoutIdExist!");
        })

    }, doesUserIdExist: async function (id) {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  workouts WHERE user_id = $1 LIMIT 1)", values: [id]
        }

        return db.query(query).then((rows) => {
            return rows.rows[0]['exists'];
        }).catch(e => {
            console.log(e.message);
            throw new Error("Error in doesUserIdExist!");
        })
    }
}

module.exports = WorkoutModel;