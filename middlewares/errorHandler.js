const errors = require('../utils/errors');
const {ApiError} = require("../utils/errors");


ENV = process.env.NODE_ENV;
const errorHandler = async (err, req, res, next) => {

    if (!(err instanceof errors.ApiError)) {
        err = new ApiError("Internal server error", false);
    }

    const response = {
        code: err.statusCode, message: err.message, ...(ENV === "development" && {stack: err.stack})
    };
    if (ENV === "development") {
        console.log(err);
    }
    res.status(err.statusCode).send(response);

    if (ENV === "production" && !err.isOperational) {
        console.log("Hit inoperable error!");
        process.kill(process.pid, "SIGTERM");
        // TODO: Restart server when closing;
    }
};


module.exports = {
    errorHandler
};
