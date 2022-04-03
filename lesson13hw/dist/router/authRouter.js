"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/registration', middlewares_1.userMiddleware.checkValidCreateUser, middlewares_1.userMiddleware.checkIsUserUniqueForCreate, controller_1.authController.registration);
exports.authRouter.post('/login', middlewares_1.userMiddleware.checkValidLoginUpdateUser, middlewares_1.userMiddleware.checkIfUserExists, controller_1.authController.login);
exports.authRouter.post('/logout', middlewares_1.authMiddleware.checkAccessToken, controller_1.authController.logout);
exports.authRouter.post('/refresh', middlewares_1.authMiddleware.checkRefreshToken, controller_1.authController.refresh);
exports.authRouter.post('/forgotPass', middlewares_1.emailMiddleware.checkValidEmail, middlewares_1.userMiddleware.checkIfUserExists, controller_1.authController.forgotPass);
exports.authRouter.post('/setNewPass', middlewares_1.userMiddleware.checkPasswordUser, middlewares_1.authMiddleware.checkActionToken, controller_1.authController.updateUserPass);
//# sourceMappingURL=authRouter.js.map