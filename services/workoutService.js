const WorkoutModel = require('../models/workoutModel');
const UserModel = require('../models/userModel');

const getAllWorkoutsByUser = async (userId, config = {}) => {
    if (await WorkoutModel.doesUserIdExist(userId) === false){
        throw new Error("No workouts for given userId");
    }

    return WorkoutModel.getAllFromUser(userId);
}
const getWorkoutById = async (id, config = {}) => {
    const rows = await WorkoutModel.getOneById(id, config);

    if (rows.rows.length === 0) {
        throw new Error("Workout with provided workout_id does not exist!");
    }
    return rows;
}

const createWorkout = async (userId, completedAt, duration, exercises, config = {}) => {
    if (await UserModel.doesIdExist(userId) === false){
        throw new Error("Cannot create workout for nonexistent user!");
    }

    return WorkoutModel.create(userId, completedAt, duration, exercises, config);
}

module.exports = {
    getAllWorkoutsByUser, getWorkoutById, createWorkout
}