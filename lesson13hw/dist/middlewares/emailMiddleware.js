"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailMiddleware = void 0;
const errorHandler_1 = require("../error/errorHandler");
const validator_1 = require("../validator");
class EmailMiddleware {
    async checkValidEmail(req, res, next) {
        try {
            const { error, value } = await validator_1.emailValidator.email.validate(req.body);
            if (error) {
                next(new errorHandler_1.ErrorHandler(error.message));
                return;
            }
            req.body = value;
            next();
        }
        catch (err) {
            next(err.message);
        }
    }
}
exports.emailMiddleware = new EmailMiddleware();
//# sourceMappingURL=emailMiddleware.js.map