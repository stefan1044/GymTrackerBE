const {Pool} = require('pg');
const logger = require('./utils/logger');


const config = {
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    tsl: true,
    max: 50,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 1000,
    maxUses: 7500
};
const pool = new Pool(config);
// Counters used for debugging. Not currently used anywhere
let connectionCount = 0;
let acquireCount = 0;


if (process.env.NODE_ENV === "development") {
    pool.on("end", () =>  logger.info(`Pool closed! connectionCount:${connectionCount}, acquireCount:${acquireCount}`));
    pool.on("error", (e, client) => {
        logger.error(`Db client encountered errors!\nError message: ${e.message} with stack:\n ${e.stack}`);
        client.release();
    });
    pool.on("notice", msg => console.warn("Pool notice", msg));
    pool.on("connect", client => {
        connectionCount++;
        logger.info(`Client connected!`);
    });
    pool.on("acquire", client => {
        acquireCount++;
        logger.info("Client acquired!");
    });

    pool.connect().then(client => {
        client.query("SELECT NOW()").then(rows =>
            logger.info(`Pinged successfully! ${rows.rows[0]['now']}`)
        ).catch(e => {
            client.release();
            logger.error(`Ping error!\nError message: ${e.message} with stack:\n ${e.stack}`);
        });
    }).catch(e => {
        pool.end();
        logger.error(`Db connection error!\nError message: ${e.message} with stack:\n ${e.stack}`);
    });


    module.exports = {
        async query(text, values = []) {
            const start = Date.now();
            const res = await pool.query(text, values);
            const duration = Date.now() - start;
            logger.info(`executed query ${text.text} Duration:${duration} Returned rows:${res.rowCount}` );
            return res;
        },
        end: pool.end,
    };
} else {
    pool.on("end", () => logger.info(`Pool closed! connectionCount:${connectionCount}, acquireCount:${acquireCount}`));
    pool.on("error", (e, client) => {
        client.release();
    });
    pool.on("notice", msg => logger.warn(`Pool notice: ${msg}`));
    pool.on("connect", client => {
        connectionCount++;
    });
    pool.on("acquire", client => {
        acquireCount++;
    });

    pool.connect().then(client => {
        client.query("SELECT NOW()").then(rows => {
        }).catch(e => {
            client.release();
        });
    }).catch(e => {
        logger.error("Client closed when trying to open!");
        pool.end();
    });


    module.exports = {
        async query(text, values = []) {
            return pool.query(text, values)
        },
        end: pool.end,
    };
}
