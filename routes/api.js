const users = require('./userRoutes');
const workouts = require('./workoutRoutes')

// TODO: Add error handling middleware
module.exports = app => {
    app.use("/users", users);
    app.use("/workouts", workouts);
}