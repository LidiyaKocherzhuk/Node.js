"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionTokenRepository = void 0;
const typeorm_1 = require("typeorm");
const entity_1 = require("../../entity");
class ActionTokenRepository {
    async createToken(token) {
        return (0, typeorm_1.getManager)().getRepository(entity_1.ActionTokenEntity).save(token);
    }
}
exports.actionTokenRepository = new ActionTokenRepository();
//# sourceMappingURL=actionTokenRepository.js.map