"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRepository = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../../entity");
class TokenRepository {
    async createToken(token) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.TokenEntity).save(token);
    }
    async findTokenByUser(userId) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.TokenEntity).findOne({ userId });
    }
    async deleteByParams(findObject) {
        await (0, typeorm_1.getManager)().getRepository(entity_1.TokenEntity).delete(findObject);
    }
}
exports.tokenRepository = new TokenRepository();
//# sourceMappingURL=tokenRepository.js.map