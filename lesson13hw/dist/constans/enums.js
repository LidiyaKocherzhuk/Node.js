"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTokenType = exports.EmailActionEnum = void 0;
var EmailActionEnum;
(function (EmailActionEnum) {
    EmailActionEnum[EmailActionEnum["WELCOME"] = 0] = "WELCOME";
    EmailActionEnum[EmailActionEnum["ACCOUNT_BLOCKED"] = 1] = "ACCOUNT_BLOCKED";
    EmailActionEnum[EmailActionEnum["FORGOT_PASSWORD"] = 2] = "FORGOT_PASSWORD";
})(EmailActionEnum = exports.EmailActionEnum || (exports.EmailActionEnum = {}));
var ActionTokenType;
(function (ActionTokenType) {
    ActionTokenType[ActionTokenType["FORGOT_PASSWORD"] = 0] = "FORGOT_PASSWORD";
})(ActionTokenType = exports.ActionTokenType || (exports.ActionTokenType = {}));
//# sourceMappingURL=enums.js.map