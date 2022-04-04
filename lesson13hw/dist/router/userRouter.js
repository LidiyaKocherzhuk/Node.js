"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', controller_1.userController.getUsersPagination);
exports.userRouter.get('/:id', controller_1.userController.getUserById);
exports.userRouter.delete('/:id', middlewares_1.userMiddleware.checkValidParams, controller_1.userController.deleteUser);
//# sourceMappingURL=userRouter.js.map