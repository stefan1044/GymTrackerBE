require('dotenv').config();
const express = require('express');
const app = express();
const pool = require('./database');
const logger = require('./utils/logger');

const runServer = ()=> {

    const middlewares = require('./middlewares/middlewares');
    middlewares(app);

    const mountRoutes = require('./routes/api');
    mountRoutes(app);


    const port = process.env.PORT;
    logger.log({
        level: "info",
        message: `Node environment: ${process.env.NODE_ENV}`
    });
    const server = app.listen(port ||0, () => {
        logger.log({
            level: "info",
            message: `App listening at port http://localhost:${server.address().port}`
        });
    });

    // TODO: Perform better cleanup
    process.on("SIGTERM", () => {
        logger.info(`Received SIGTERM`);
        if (server) {
            server.close();
            pool.end();
        }
    });
    process.on("SIGINT", () => {
        logger.info(` Received SIGINT`);
        if (server) {
            server.close();
            pool.end();
        }
    });
    process.on("warning", e => {
        logger.warn(`Process warning! ${e.message}\n${e.stack}`)
    });

    const closeServer = () => {
        server.close();
        pool.end();
        logger.info(`Server closed with closeServer!`);
    };

    return {port:server.address().port, closeServer};
};


module.exports = {
    runServer
};
