const users = require("./userRoutes");




module.exports = (app) => {
    app.use("/users", users)
}