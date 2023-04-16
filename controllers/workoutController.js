const httpStatus = require('http-status');
const workoutService = require('../services/workoutService');

const createWorkout = async (req, res) => {
    await workoutService.createWorkout(req.params.user_id, req.body['completed_at'], req.body['duration'], req.body['exercises']).then((rows) => {
        res.status(httpStatus.CREATED).send();
    }).catch(e => {
        if (e.message === "Cannot create workout for nonexistent user!") {
            res.status(httpStatus.BAD_REQUEST).send("Cannot create workout for nonexistent user!");
            return;
        }

        res.status(httpStatus.NOT_FOUND).send("Error when creating workout!");
        console.log(e, e.stack);
    })
}

const readWorkoutById = async (req, res) => {
    await workoutService.getWorkoutById(req.params.id).then((rows) => {
        res.status(httpStatus.OK).json(rows.rows);
    }).catch(e => {
        if (e.message === "Workout with provided workout_id does not exist!") {
            res.status(httpStatus.NOT_FOUND).send("Workout with provided workout_id does not exist!");
            return;
        }

        console.log(e, e.stack);
    })
}
const readWorkoutsByUserId = async (req, res) => {
    await workoutService.getAllWorkoutsByUser(req.params.id).then(rows => {
        res.status(httpStatus.OK).json(rows);
    }).catch(e => {
        if (e.message === "No workouts for given userId") {
            res.status(httpStatus.NOT_FOUND).send("No workouts for given userId");
            return;
        }

        res.status(httpStatus.NOT_FOUND).send("Error when getting workouts by user_id!");
        console.log(e, e.stack);
    })
}


module.exports = {
    createWorkout, readWorkoutById, readWorkoutsByUserId
}