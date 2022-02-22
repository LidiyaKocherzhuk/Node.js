const {Router} = require("express");

const loginController = require("../controllers/loginController");
const {includeAll, includeEmail} = require("../middleware/loginMiddleware");

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
    res.render("login");
});

loginRouter.post("/", includeAll, includeEmail, loginController.loginUser)


module.exports = loginRouter;
