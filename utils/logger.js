const {createLogger, format, transports} = require('winston');
const winston = require("winston");
const {combine, timestamp} = format;


const logger = new createLogger();

// TODO: Add production logger
if (process.env.NODE_ENV === "production") {
    logger.configure({
        transports: [new transports.File({
            filename: "production.log",
            level: "info",
            format: format.combine(
                format.json(),
                format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
            )
        })], exceptionHandlers: [new transports.File({
            filename: 'productionExceptions.log',
            format: format.combine(
                format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                format.json(),
                //format.printf(info => `${info.timestamp} [${info.level}]: ${JSON.stringify(info.message)}\n`),
                format.printf(info => JSON.stringify(info, null, 2))
            )
        })]
    });
} else {
    logger.configure({
        transports: [new transports.File({
            filename: "development.log",
            level: "debug",
            format: format.combine(
                format.json(),
                format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
            )
        }), new transports.Console({
            level: "debug",
            format: format.combine(
                format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                format.colorize({all: true}),
                format.json(),
                format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
            )
        })], exceptionHandlers: [new transports.File({
            filename: 'developmentExceptions.log',
            format: format.combine(
                format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                format.json(),
                //format.printf(info => `${info.timestamp} [${info.level}]: ${JSON.stringify(info.message)}\n`),
                format.printf(info => JSON.stringify(info, null, 2))
            )
        })]
    });
}


module.exports = logger;
