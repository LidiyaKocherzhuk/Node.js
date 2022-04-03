"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const userService_1 = require("./userService");
const tokenService_1 = require("./tokenService");
class AuthService {
    async registration(body) {
        const createUser = await userService_1.userService.createUser(body);
        return this._getTokenData(createUser);
    }
    async _getTokenData(userData) {
        const { id, email } = userData;
        const { refreshToken, accessToken } = await tokenService_1.tokenService.generateTokenPair({
            userId: id,
            userEmail: email,
        });
        await tokenService_1.tokenService.saveToken({ userId: id, refreshToken, accessToken });
        return {
            refreshToken,
            accessToken,
            userId: id,
            userEmail: email,
        };
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=authService.js.map