const db = require('../database');
const {Api500Error} = require('../utils/errorHandler');

const WorkoutModel = {
    getAllFromUser: async function (userName, config = {}) {
        let query = {
            text: "SELECT * FROM workouts WHERE user_id = $1", ...config
        }
        const values = [userName];

        return db.query(query, values);
    }, getOneById: async function (id, config = {}) {
        let query = {
            text: "SELECT * FROM workouts WHERE workout_id = $1 LIMIT 1", ...config
        }
        const values = [id];

        return db.query(query, values);
    }, create: async function (userId, completedAt, duration, exercises, config = {}) {
        let query = {
            text: "INSERT INTO workouts(user_id, completed_at, duration, exercises) VALUES($1, $2, $3, $4)", ...config
        }
        const values = [userId, completedAt, duration, exercises];

        return db.query(query, values);
    }, doesWorkoutIdExist: async function (id) {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  workouts WHERE workout_id = $1 LIMIT 1)",
        }
        const values = [id];

        return db.query(query, values).then((rows) => {
            return rows.rows[0]['exists'];
        }).catch(e => {
            console.log(e.message, e.stack);
            throw new Api500Error("Error in doesWorkoutIdExist!");
        })

    }, doesUserIdExist: async function (id) {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  workouts WHERE user_id = $1 LIMIT 1)",
        }
        const values = [id];

        return db.query(query, values).then((rows) => {
            return rows.rows[0]['exists'];
        }).catch(e => {
            console.log(e.message, e.stack);
            throw new Api500Error("Error in doesUserIdExist!");
        })
    }
}

module.exports = WorkoutModel;
