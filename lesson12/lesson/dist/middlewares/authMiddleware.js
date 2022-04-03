"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const services_1 = require("../services");
const constans_1 = require("../constans");
const errorHandler_1 = require("../error/errorHandler");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get(constans_1.constants.AUTHORIZATION);
            if (!accessToken) {
                next(new errorHandler_1.ErrorHandler('no token'));
                return;
            }
            const { userId } = await services_1.tokenService.verifyToken(accessToken, 'access');
            const userFromToken = await services_1.userService.getUserById(userId);
            if (!userFromToken) {
                next(new errorHandler_1.ErrorHandler('wrong token', 404));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    async checkRefreshToken(req, res, next) {
        try {
            const refreshToken = req.get('Authorization');
            if (!refreshToken) {
                next(new errorHandler_1.ErrorHandler('no token'));
                return;
            }
            const { userId } = await services_1.tokenService.verifyToken(refreshToken, 'refresh');
            const userFromToken = await services_1.userService.getUserById(userId);
            if (!userFromToken) {
                next(new errorHandler_1.ErrorHandler('wrong token', 404));
                return;
            }
            req.user = userFromToken;
            next();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
//# sourceMappingURL=authMiddleware.js.map