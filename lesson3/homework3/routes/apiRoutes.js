const {Router} = require("express");
const loginRouter = require("../routes/loginRouter");
const usersRouter = require("../routes/usersRouter");
const signInRouter = require("../routes/signInRouter");

const routes = Router();

routes.use("/login", loginRouter);
routes.use("/users", usersRouter);
routes.use("/signIn", signInRouter);

routes.get("/error", (req, res) => {
    if (Object.keys(req.query).length) {
        res.render("error", {error: req.query.error});
    }
});

module.exports = routes;