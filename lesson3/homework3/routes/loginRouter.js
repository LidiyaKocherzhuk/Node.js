const {Router} = require("express");
const loginController = require("../controllers/loginController");
const loginMiddleware = require("../middleware/loginMiddleware");

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
    res.render("login");
});

loginRouter.post("/", loginMiddleware, loginController.loginUser)


module.exports = loginRouter;
