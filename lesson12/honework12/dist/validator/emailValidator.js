"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const constans_1 = require("../constans");
exports.emailValidator = {
    email: joi_1.default.object({
        email: joi_1.default.string()
            .regex(constans_1.regexp.EMAIL)
            .required(),
    }),
};
//# sourceMappingURL=emailValidator.js.map