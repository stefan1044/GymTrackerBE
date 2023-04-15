const httpStatus = require('http-status');

const validateWorkout = async (req, res, next) => {
    // format the dates into integers
    const completedAt = req.body['completed_at'].split("-").map(value => {
        if (value[0] === "0") {
            return parseInt(value[1]);
        } else return parseInt(value);
    })
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear(), currentMonth = currentDate.getMonth() + 1,
        currentDay = currentDate.getDate();
    // Verify if date is correct
    // TODO: Verify all possible dates
    if (completedAt[0] > currentYear || completedAt[0] < 2023) {
        res.status(httpStatus.BAD_REQUEST).send("Incorrect date!");
        return;
    }
    if (completedAt[0] === currentYear) {
        if (completedAt[1] > currentMonth || completedAt[1] > 12 || completedAt[1] < 1) {
            res.status(httpStatus.BAD_REQUEST).send("Incorrect date!");
            return;
        }
        if (completedAt[1] === currentMonth) {
            if (completedAt[2] > currentDay || completedAt[2] > 31 || completedAt[2] < 1) {
                res.status(httpStatus.BAD_REQUEST).send("Incorrect date!");
                return;
            }
        }
    }

    // verify duration
    const duration = req.body['duration'];
    if (duration < 1 || duration > 1440) {
        res.status(httpStatus.BAD_REQUEST).send("Incorrect duration!");
        return;
    }

    // verify exercises
    const exercises = req.body['exercises'];
    console.log(typeof exercises);
    try {
        const result = JSON.stringify(exercises);
    } catch (e) {
        res.status(httpStatus.BAD_REQUEST).send("Error parsing exercise json");
        console.error(e, e.stack);
        return;
    }


    next();
}

module.exports = {
    validateWorkout
}