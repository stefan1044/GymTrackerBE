const httpStatus = require('http-status');
const workoutService = require('../services/workoutService');

const createWorkout = async (req, res) => {
    await workoutService.createWorkout(req.params.user_id, req.body['completed_at'], req.body['duration'], req.body['exercises']).then(rows => {
        res.status(httpStatus.CREATED).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            res.status(httpStatus.NOT_FOUND).send("Cannot create workout for nonexistent user!");
            //e.message = "User with provided user_id does not exist!";
            //next(e)
        } else {
            res.status(httpStatus.NOT_FOUND).send("Error when creating workout!");
            console.log(e.message, e.stack);
            //next(e)
        }
    });
}

const readWorkoutById = async (req, res) => {
    await workoutService.getWorkoutById(req.params.id).then(rows => {
        res.status(httpStatus.OK).json(rows.rows);
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            res.status(httpStatus.NOT_FOUND).send("Workout with provided workout_id does not exist!");
            //e.message = "User with provided user_id does not exist!";
            //next(e)
        } else {
            res.status(httpStatus.NOT_FOUND).send("Error when reading workout by id!");
            console.log(e.message, e.stack);
            //next(e)
        }
    });
}
const readWorkoutsByUserId = async (req, res) => {
    await workoutService.getAllWorkoutsByUser(req.params.id).then(rows => {
        res.status(httpStatus.OK).json(rows);
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            res.status(httpStatus.NOT_FOUND).send("No workouts for given userId");
            //e.message = "User with provided user_id does not exist!";
            //next(e)
        } else {
            res.status(httpStatus.NOT_FOUND).send("Error when reading workouts by userId!");
            console.log(e.message, e.stack);
            //next(e)
        }
    });
}


module.exports = {
    createWorkout, readWorkoutById, readWorkoutsByUserId
}