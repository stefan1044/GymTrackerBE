const {Pool} = require('pg');


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
let connectionCount = 0;
let acquireCount = 0;

if (process.env.NODE_ENV === "development") {
    pool.on("end", () => console.log("Pool closed!"))
    pool.on("error", (e, client) => {
        console.error("Db client encountered errors!", e.message, e.stack);
        client.release();
    });
    pool.on("notice", msg => console.warn("Pool notice", msg));
    pool.on("connect", client => {
        connectionCount++;
        console.log("Client connected!");
    });
    pool.on("acquire", client => {
        acquireCount++;
        console.log("Client acquired!");
    });

    pool.connect().then(client => {
        client.query("SELECT NOW()").then(rows => {
            console.log(`Pinged successfully! ${rows.rows[0]['now']}`);
        }).catch(e => {
            client.release();
            console.log("Ping error!", e.message, e.stack);
        });
    }).catch(e => {
        pool.end();
        console.error("Db connection error!", e.message, e.stack);
    });


    module.exports = {
        async query(text, values = []) {
            const start = Date.now()
            const res = await pool.query(text, values)
            const duration = Date.now() - start
            console.log('executed query', {text, duration, rows: res.rowCount})
            return res
        },
        end: pool.end,
    };
} else {
    pool.on("end", () => console.log("Pool closed!"))
    pool.on("error", (e, client) => {
        client.release();
    });
    pool.on("notice", msg => console.warn("Pool notice", msg));
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
        pool.end();
    });


    module.exports = {
        async query(text, values = []) {
            return pool.query(text, values)
        },
        end: pool.end,
    };
}
