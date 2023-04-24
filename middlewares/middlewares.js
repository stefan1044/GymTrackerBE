const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, max: 20, skipSuccessfulRequests: true,
});

/*
    Adds various middlewares
 */
module.exports = app => {
    app.use(helmet());
    app.use(compression());
    app.use(cors());
    app.use(express.json());
    if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
        //require('express-debug')(app);  deprecated?

    } else {
        app.use("/users/login", authLimiter);
    }

};
