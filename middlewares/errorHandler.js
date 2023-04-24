const errors = require('../utils/errors');
const {ApiError} = require("../utils/errors");
const logger = require('../utils/logger');


/*
    Middleware that handles all errors that bubble up
 */
const errorHandler = async (err, req, res, next) => {

    if (!(err instanceof errors.ApiError)) {
        err = new ApiError("Internal server error", false);
    }

    const response = {
        code: err.statusCode, message: err.message, ...(process.env.NODE_ENV === "development" && {stack: err.stack})
    };
    if (process.env.NODE_ENV === "development") {
        logger.error(`Error code:${err.code} Error message: ${err.message}\nStack trace: ${err.stack}`)
    }
    res.status(err.statusCode).send(response);

    if (process.env.NODE_ENV === "production" && !err.isOperational) {
        logger.error(`Hit inoperable error!\nError message:${err.message}\nStack trace: ${err.stack}`);
        process.kill(process.pid, "SIGTERM");
        // TODO: Restart server after closing;
    }
};


module.exports = {
    errorHandler
};
