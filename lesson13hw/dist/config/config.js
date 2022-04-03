"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    PORT: process.env.PORT || 5000,
    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 12214,
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 12214,
    SECRET_ACTION_KEY: process.env.SECRET_ACTION_KEY || 12214,
    MAX_AGE_ACCESS_TOKEN: process.env.MAX_AGE_ACCESS_TOKEN,
    MAX_AGE_REFRESH_TOKEN: process.env.MAX_AGE_REFRESH_TOKEN,
    MAX_AGE_ACTION_TOKEN: process.env.MAX_AGE_ACTION_TOKEN,
    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
    FRONTEND_URL: process.env.FRONTEND_URL,
};
//# sourceMappingURL=config.js.map