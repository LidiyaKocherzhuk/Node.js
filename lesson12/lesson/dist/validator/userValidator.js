"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const constans_1 = require("../constans");
exports.userValidator = {
    createUser: joi_1.default.object({
        firstName: joi_1.default.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        lastName: joi_1.default.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        age: joi_1.default.number()
            .integer()
            .min(18)
            .max(100),
        phone: joi_1.default.string()
            .pattern(new RegExp(constans_1.regexp.PHONE))
            .required(),
        email: joi_1.default.string()
            .regex(constans_1.regexp.EMAIL)
            .required(),
        password: joi_1.default.string()
            .regex(constans_1.regexp.PASSWORD)
            .required(),
    }),
    loginUpdateUser: joi_1.default.object({
        email: joi_1.default.string()
            .regex(constans_1.regexp.EMAIL)
            .required(),
        password: joi_1.default.string()
            .regex(constans_1.regexp.PASSWORD)
            .required(),
    }),
};
//# sourceMappingURL=userValidator.js.map