require('dotenv').config();
const {Client} = require('pg');
const connectDb = () => {
    try {
        const client = new Client({
            user: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        })

        client.connect();
        client.on("notice", (msg) => console.warn("notice:", msg));
        client.on("error", (err) => {
            console.error("Db client encountered errors!", err.stack);
        });
        client.on("end", () => {
            console.log("Db client closed!");
        });

        client.query("SELECT NOW()").then((result) => console.log(`Pinged successfully! ${result.rows[0]['now']}`)).catch((err) => {
            console.error("Ping error!", err.stack)
            client.end();
        });
        return client;
    } catch (error) {
        console.error("Db connection error!", error.stack);
    }
}

db = connectDb();

module.exports = db;