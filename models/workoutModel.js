const db = require('../database');
const {Api500Error} = require('../utils/errors');
const logger = require("../utils/logger");


/*
 Workout Model
 Handles database requests related to workout data.
 */
const WorkoutModel = {
    getWorkoutsByUserId: async (userId) => {
        const query = {
            text: "SELECT * FROM workouts WHERE user_id = $1"
        };
        const values = [userId];

        return db.query(query, values).then(queryResult => queryResult.rows);
    }, getWorkoutByWorkoutId: async (id) => {
        const query = {
            text: "SELECT * FROM workouts WHERE workout_id = $1 LIMIT 1"
        };
        const values = [id];

        return db.query(query, values).then(queryResult => queryResult.rows);
    }, createWorkoutInDatabase: async (userId, completedAt, duration, exercises) => {
        const query = {
            text: "INSERT INTO workouts(user_id, completed_at, duration, exercises) VALUES($1, $2, $3, $4)"
        };
        const values = [userId, completedAt, duration, exercises];

        await db.query(query, values);
    }, doesWorkoutIdExist: async id => {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  workouts WHERE workout_id = $1 LIMIT 1)",
        };
        const values = [id];

        return db.query(query, values).then(rows => {
            return rows.rows[0]['exists'];
        }).catch(e => {
            logger.error(`Error at workoutModel.doesWorkoutIdExist! Error message:${e.message}\nstack:${e.stack}`);
            throw new Api500Error("Error in doesWorkoutIdExist!");
        })
    }, doesUserIdExist: async id => {
        const query = {
            text: "SELECT exists (SELECT 1 FROM  workouts WHERE user_id = $1 LIMIT 1)",
        };
        const values = [id];

        return db.query(query, values).then(rows => {
            return rows.rows[0]['exists'];
        }).catch(e => {
            logger.error(`Error at workoutModel.doesUserIdExist! Error message:${e.message}\nstack:${e.stack}`);
            throw new Api500Error("Error in doesUserIdExist!");
        })
    }
};


module.exports = WorkoutModel;
