require('dotenv').config();
const express = require('express');
const app = express();
const pool = require('./database');
const logger = require('./utils/logger');

const middlewares = require('./middlewares/middlewares');
middlewares(app);

const mountRoutes = require('./routes/api');
mountRoutes(app);


const port = process.env.PORT;
logger.log({
    level: "info",
    message: `Node environment: ${process.env.NODE_ENV}`
});
server = app.listen(port, () => {
    logger.log({
        level: "info",
        message: `App listening at port http://localhost:${port}`
    });
});

process.on("SIGTERM", () => {
    logger.log({
        level: "info",
        message: `Received SIGTERM`
    });
    if (server) {
        server.close();
        pool.end();
    }
});
process.on("SIGINT", () => {
    logger.log({
        level: "info",
        message: ` Received SIGINT`
    });
    if (server) {
        server.close();
        pool.end();
    }
});
