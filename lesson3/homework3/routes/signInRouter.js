const {Router} = require("express");
const users = require("../db/users");
const signInController = require("../controllers/signInController");
const includeEmail = require("../middleware/signInMiddleware");

const signInRouter = Router();

signInRouter.get("/", (req, res) => {
    res.render("signIn");
});

signInRouter.post("/",includeEmail, signInController.signInEmailPassword)

module.exports = signInRouter;