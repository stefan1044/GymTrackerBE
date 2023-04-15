const users = require('./userRoutes');
const workouts = require('./workoutRoutes')


module.exports = (app) => {
    app.use("/users", users)
    app.use("/workouts", workouts)
}