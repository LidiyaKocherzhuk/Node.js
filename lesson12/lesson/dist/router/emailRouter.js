"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
exports.emailRouter = (0, express_1.Router)();
exports.emailRouter.post('/', middlewares_1.emailMiddleware.checkValidEmail, controller_1.emailController.sendEmail);
//# sourceMappingURL=emailRouter.js.map