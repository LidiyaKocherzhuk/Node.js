"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const repositories_1 = require("../repositories");
class TokenService {
    generateActionToken(payload) {
        return jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_ACTION_KEY, { expiresIn: config_1.config.MAX_AGE_ACTION_TOKEN });
    }
    generateTokenPair(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_ACCESS_KEY, { expiresIn: config_1.config.MAX_AGE_ACCESS_TOKEN });
        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.config.SECRET_REFRESH_KEY, { expiresIn: config_1.config.MAX_AGE_REFRESH_TOKEN });
        return {
            accessToken,
            refreshToken,
        };
    }
    async saveToken(payload) {
        const { userId, refreshToken, accessToken } = payload;
        const tokenFromDb = await repositories_1.tokenRepository.findTokenByUser(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return repositories_1.tokenRepository.createToken(tokenFromDb);
        }
        return repositories_1.tokenRepository.createToken({ refreshToken, accessToken, userId });
    }
    async deleteByParams(userId) {
        await repositories_1.tokenRepository.deleteByParams({ userId });
    }
    async verifyToken(authToken, tokenType) {
        let secretWord = config_1.config.SECRET_ACCESS_KEY;
        if (tokenType === 'refresh') {
            secretWord = config_1.config.SECRET_REFRESH_KEY;
        }
        if (tokenType === 'action') {
            secretWord = config_1.config.SECRET_ACTION_KEY;
        }
        return jsonwebtoken_1.default.verify(authToken, secretWord);
    }
}
exports.tokenService = new TokenService();
//# sourceMappingURL=tokenService.js.map