"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailInfo = void 0;
const enums_1 = require("./enums");
exports.emailInfo = {
    [enums_1.EmailActionEnum.WELCOME]: {
        subject: 'september 2021@',
        templateName: 'welcome',
    },
    [enums_1.EmailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'september 2021@',
        templateName: 'accountBlocked',
    },
    [enums_1.EmailActionEnum.FORGOT_PASSWORD]: {
        subject: 'dont worry, update your pass',
        templateName: 'forgotPassword',
    },
};
//# sourceMappingURL=emailInfo.js.map