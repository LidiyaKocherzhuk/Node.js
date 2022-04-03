"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const services_1 = require("../services");
const validator_1 = require("../validator");
const errorHandler_1 = require("../error/errorHandler");
class UserMiddleware {
    async checkIfUserExists(req, res, next) {
        try {
            const { email } = req.body;
            const userFromDbByEmail = await services_1.userService.getUserByEmail(email);
            if (!userFromDbByEmail) {
                next(new errorHandler_1.ErrorHandler('User not found', 404));
                return;
            }
            req.user = userFromDbByEmail;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    async checkIsUserUniqueForCreate(req, res, next) {
        try {
            const { email, phone } = req.body;
            const userFromBD = await services_1.userService.getUserByParams({ email, phone });
            if (userFromBD) {
                next(new errorHandler_1.ErrorHandler('User already exist'));
                return;
            }
            next();
        }
        catch (err) {
            next(err);
        }
    }
    async checkValidCreateUser(req, res, next) {
        try {
            const { error, value } = await validator_1.userValidator.createUser.validate(req.body);
            if (error) {
                next(new errorHandler_1.ErrorHandler(error.message, 404));
                return;
            }
            req.body = value;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    async checkValidLoginUpdateUser(req, res, next) {
        try {
            const { error, value } = await validator_1.userValidator.loginUpdateUser.validate(req.body);
            if (error) {
                next(new errorHandler_1.ErrorHandler(error.message, 404));
                return;
            }
            req.body = value;
            next();
        }
        catch (err) {
            next(err.message);
        }
    }
    async checkPasswordUser(req, res, next) {
        try {
            const { error, value } = await validator_1.userValidator.password.validate(req.body);
            if (error) {
                next(new errorHandler_1.ErrorHandler(error.message, 404));
                return;
            }
            req.body = value;
            next();
        }
        catch (err) {
            next(err.message);
        }
    }
    async checkValidParams(req, res, next) {
        try {
            const { error } = await validator_1.paramsValidator.id.validate(req.params);
            if (error) {
                next(new errorHandler_1.ErrorHandler(error.message, 404));
                return;
            }
            next();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
//# sourceMappingURL=userMiddleware.js.map