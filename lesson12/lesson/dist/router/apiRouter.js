"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const authRouter_1 = require("./authRouter");
const emailRouter_1 = require("./emailRouter");
const userRouter_1 = require("./userRouter");
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.use('/users', userRouter_1.userRouter);
exports.apiRouter.use('/auth', authRouter_1.authRouter);
exports.apiRouter.use('/email', emailRouter_1.emailRouter);
//# sourceMappingURL=apiRouter.js.map