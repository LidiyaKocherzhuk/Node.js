"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showNewUsers = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const services_1 = require("../services");
const showNewUsers = () => {
    node_cron_1.default.schedule('*/10 * * * * *', async () => {
        console.log('Runn');
        const users = await services_1.userService.getNewUsers();
        console.log(users);
    });
};
exports.showNewUsers = showNewUsers;
//# sourceMappingURL=showNewUsers.js.map