const httpStatus = require('http-status');
const workoutService = require('../services/workoutService');

const createWorkout = async (req, res, next) => {
    await workoutService.createWorkout(req.params.user_id, req.body['completed_at'], req.body['duration'], req.body['exercises']).then(rows => {
        res.status(httpStatus.CREATED).send();
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            e.message = "User with provided user_id does not exist!";
            next(e);
        } else {
            next(e);
        }
    });
}

const readWorkoutById = async (req, res, next) => {
    await workoutService.getWorkoutById(req.params.id).then(rows => {
        res.status(httpStatus.OK).json(rows.rows);
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            e.message = "User with provided user_id does not exist!";
            next(e);
        } else {
            next(e);
        }
    });
}
const readWorkoutsByUserId = async (req, res, next) => {
    await workoutService.getAllWorkoutsByUser(req.params.id).then(rows => {
        res.status(httpStatus.OK).json(rows);
    }).catch(e => {
        if (e.statusCode === httpStatus.NOT_FOUND) {
            e.message = "User with provided user_id does not exist!";
            next(e)
        } else {
            next(e)
        }
    });
}


module.exports = {
    createWorkout, readWorkoutById, readWorkoutsByUserId
}