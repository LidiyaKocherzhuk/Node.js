"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_templates_1 = __importDefault(require("email-templates"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config/config");
const constans_1 = require("../constans");
// @ts-ignore
console.log(global.rootDir);
class EmailService {
    constructor() {
        this.templateRenderer = new email_templates_1.default({
            views: {
                // @ts-ignore
                root: path_1.default.join(global.rootDir, 'emailTemplates'),
            },
        });
    }
    async sendMail(userMail, action, context) {
        const { subject, templateName } = await constans_1.emailInfo[action];
        Object.assign(context, { frontendUrl: 'https://google.com' });
        const html = await this.templateRenderer.render(templateName, context);
        const emailTransporter = nodemailer_1.default.createTransport({
            from: 'User',
            service: 'gmail',
            auth: {
                user: config_1.config.NO_REPLY_EMAIL,
                pass: config_1.config.NO_REPLY_EMAIL_PASSWORD,
            },
        });
        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}
exports.emailService = new EmailService();
//# sourceMappingURL=emailService.js.map