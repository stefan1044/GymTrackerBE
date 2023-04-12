const httpStatus = require('http-status');

const app = require("./index");
const mountRoutes = require("./routes/api");
mountRoutes(app);

// send 404 for unknown routes
app.use((req, res) => {
    res.status(httpStatus.NOT_FOUND).send();
});

const port = process.env.PORT;

console.log(`Node environment: ${process.env.NODE_ENV}`);
app.listen(port, () => {
    console.log(`App listening at port http://localhost:${port}`);
})

