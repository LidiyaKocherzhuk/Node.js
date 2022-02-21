const {Router} = require("express");
const signInController = require("../controllers/signInController");
const includeEmail = require("../middleware/signInMiddleware");

const signInRouter = Router();

signInRouter.get("/", (req, res) => {
    res.render("signIn");
});

signInRouter.post("/",includeEmail, signInController.signInEmailPassword)

module.exports = signInRouter;