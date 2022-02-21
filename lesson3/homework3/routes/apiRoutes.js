const {Router} = require("express");
const loginRouter = require("../routes/loginRouter");
const usersRouter = require("../routes/usersRouter");
const signInRouter = require("../routes/signInRouter");

const routes = Router();

routes.use("/login", loginRouter);
routes.use("/users", usersRouter);
routes.use("/signIn", signInRouter);

routes.get("/error", ({query}, res) => {
    if (Object.keys(query).length) {
        res.render("error", {error: query.error});
    }
});

module.exports = routes;