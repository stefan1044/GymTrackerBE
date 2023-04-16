const users = require('./userRoutes');
const workouts = require('./workoutRoutes')
const errorMiddleware = require('../middlewares/errorHandler');
const {NOT_FOUND} = require("http-status");


module.exports = app => {
    app.use("/users", users);
    app.use("/workouts", workouts);
    // send 404 for unknown routes
    app.use((req, res) => {
        res.status(NOT_FOUND).send("Route does not exist!");
    });
    app.use(errorMiddleware.errorHandler);
}