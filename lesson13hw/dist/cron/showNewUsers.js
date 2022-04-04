"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showNewUsers = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const constans_1 = require("../constans");
const services_1 = require("../services");
const showNewUsers = () => {
    node_cron_1.default.schedule('*/10 * * * * *', async () => {
        const users = await services_1.userService.getNewUsers();
        await Promise.all(users).then((response) => response.forEach((user) => services_1.emailService.sendMail(user.email, constans_1.EmailActionEnum.WELCOME, {
            userName: user.firstName,
        })));
        console.log('ok');
    });
};
exports.showNewUsers = showNewUsers;
//# sourceMappingURL=showNewUsers.js.map