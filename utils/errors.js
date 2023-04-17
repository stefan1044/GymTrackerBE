const httpStatus = require('http-status');


class ExtendableError extends Error {
    constructor(message, isOperational, stack = "") {
        super(message);
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

class ApiError extends ExtendableError {
    constructor(message, isOperational, statusCode = httpStatus.INTERNAL_SERVER_ERROR) {
        super(message, isOperational);
        this.statusCode = statusCode;
    }
}

class Api404Error extends ApiError {
    constructor(message) {
        super(message, true, httpStatus.NOT_FOUND);
    }
}

class Api400Error extends ApiError {
    constructor(message) {
        super(message, true, httpStatus.BAD_REQUEST);

    }
}

class Api500Error extends ApiError {
    constructor(message) {
        super(message, true, httpStatus.INTERNAL_SERVER_ERROR);
    }
}

class InoperableApiError extends ApiError {
    constructor(message) {
        super(message, false, httpStatus.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    Api400Error, Api404Error, Api500Error, InoperableApiError, ApiError
};

