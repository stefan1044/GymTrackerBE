require('dotenv').config();
const express = require('express');
const app = express();
const pool = require('./database');

const middlewares = require('./middlewares/middlewares');
middlewares(app);

const mountRoutes = require('./routes/api');
mountRoutes(app);


const port = process.env.PORT;
console.log(`Node environment: ${process.env.NODE_ENV}`);
server = app.listen(port, () => {
    console.log(`App listening at port http://localhost:${port}`);
});

process.on("SIGTERM", () => {
    console.log("CLOSED BY SIGTERM");
    if (server) {
        server.close();
        pool.end();
    }
});
