const WorkoutModel = require('../models/workoutModel');
const UserModel = require('../models/userModel');
const logger = require('../utils/logger');
const {Api404Error, InoperableApiError, Api500Error} = require('../utils/errors');


const getAllWorkoutsByUser = async (userId) => {
    if (await WorkoutModel.doesUserIdExist(userId) === false) {
        throw new Api404Error("No workouts for given userId");
    }

    return WorkoutModel.getWorkoutsByUserId(userId).catch(e => {
        logger.error(`Error in workoutService.getAllWorkoutsByUser! Error message:${e.message}\nstack:${e.stack}`);
        throw new Api500Error("Error in workoutService.getAllWorkoutsByUser");
    });
};
const getWorkoutById = async (id) => {
    const workout = await WorkoutModel.getWorkoutByWorkoutId(id).catch(e => {
        logger.error(`Error in workoutService.getWorkoutById! Error message:${e.message}\nstack:${e.stack}`);
        throw new Api500Error("Error in workoutService.getWorkoutByWorkoutId");
    });
    if (workout.length === 0) {
        throw new Api404Error("Workout with provided workout_id does not exist!");
    }

    return workout;
};

const createWorkout = async (userId, completedAt, duration, exercises) => {
    if (await UserModel.doesIdExist(userId) === false) {
        throw new Api404Error("Cannot createWorkoutInDatabase workout for nonexistent user!");
    }

    await WorkoutModel.createWorkoutInDatabase(userId, completedAt, duration, exercises).catch(e => {
        logger.error(`Error in workoutService.createWorkout! Error message:${e.message}\nstack:${e.stack}`);
        throw new Api500Error("Error in workoutService.createWorkout");
    });
};


module.exports = {
    getAllWorkoutsByUser, getWorkoutById, createWorkout
};
