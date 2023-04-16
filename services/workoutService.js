const WorkoutModel = require('../models/workoutModel');
const UserModel = require('../models/userModel');
const {Api404Error, InoperableApiError} = require('../utils/errors');


const getAllWorkoutsByUser = async (userId, config = {}) => {
    if (await WorkoutModel.doesUserIdExist(userId) === false) {
        throw new Api404Error("No workouts for given userId");
    }

    return WorkoutModel.getAllFromUser(userId).catch(e => {
        throw new InoperableApiError("Error in workoutService.getAllWorkoutsByUser");
    });
}
const getWorkoutById = async (id, config = {}) => {
    const rows = await WorkoutModel.getOneById(id, config).catch(e => {
        throw new InoperableApiError("Error in workoutService.getWorkoutById");
    });

    if (rows.rows.length === 0) {
        throw new Api404Error("Workout with provided workout_id does not exist!");
    }
    return rows.rows;
}

const createWorkout = async (userId, completedAt, duration, exercises, config = {}) => {
    if (await UserModel.doesIdExist(userId) === false) {
        throw new Api404Error("Cannot create workout for nonexistent user!");
    }

    return WorkoutModel.create(userId, completedAt, duration, exercises, config).catch(e => {
        throw new InoperableApiError("Error in workoutService.createWorkout");
    });
}

module.exports = {
    getAllWorkoutsByUser, getWorkoutById, createWorkout
}