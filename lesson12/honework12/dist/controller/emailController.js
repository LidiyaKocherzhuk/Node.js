"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailController = void 0;
const services_1 = require("../services");
const constans_1 = require("../constans");
class EmailController {
    async sendEmail(req, res) {
        try {
            const { email } = req.body;
            await services_1.emailService.sendMail(email, constans_1.EmailActionEnum.WELCOME, { userName: 'Lidiya' });
            return res.status(200).json('email sent successfully');
        }
        catch (err) {
            return res.status(400).json(err.message);
        }
    }
}
exports.emailController = new EmailController();
//# sourceMappingURL=emailController.js.map