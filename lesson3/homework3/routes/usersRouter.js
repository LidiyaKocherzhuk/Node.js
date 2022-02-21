const {Router} = require("express");
const usersController = require("../controllers/usersController");

const usersRouter = Router();

usersRouter.get("/",  usersController.usersQuery);

usersRouter.get("/:userId", usersController.userId);

module.exports = usersRouter;
