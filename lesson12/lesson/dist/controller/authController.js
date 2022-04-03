"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const services_1 = require("../services");
const constans_1 = require("../constans");
const tokenRepository_1 = require("../repositories/token/tokenRepository");
class AuthController {
    async registration(req, res) {
        try {
            const data = await services_1.authService.registration(req.body);
            res.cookie(constans_1.COOKIE.nameRefreshToken, data.refreshToken, {
                maxAge: constans_1.COOKIE.maxAgeRefreshToken, httpOnly: true,
            });
            return res.status(201).json(data);
        }
        catch (err) {
            return res.status(err);
        }
    }
    async login(req, res) {
        try {
            const { id, email, password: hashPassword } = req.user;
            const { password } = req.body;
            await services_1.userService.compareUserPassword(password, hashPassword);
            const { accessToken, refreshToken } = services_1.tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });
            await tokenRepository_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            return res.status(201).json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(404).json(err.message);
        }
    }
    async logout(req, res) {
        try {
            const { id } = req.user;
            await services_1.tokenService.deleteByParams(id);
            return res.status(201).json('ok');
        }
        catch (err) {
            return res.status(401).json(err);
        }
    }
    async refresh(req, res) {
        try {
            const { id, email } = req.user;
            const refreshTokenToDelete = req.get(constans_1.constants.AUTHORIZATION);
            await tokenRepository_1.tokenRepository.deleteByParams({ refreshToken: refreshTokenToDelete });
            const { accessToken, refreshToken } = await services_1.tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });
            await tokenRepository_1.tokenRepository.createToken({ refreshToken, accessToken, userId: id });
            return res.status(201).json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        }
        catch (err) {
            return res.status(401).json(err);
        }
    }
}
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map