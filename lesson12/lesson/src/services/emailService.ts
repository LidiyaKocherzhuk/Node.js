import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';
import path from 'path';

import { config } from '../config/config';
import { EmailActionEnum, emailInfo } from '../constans';

// @ts-ignore
console.log(global.rootDir);

class EmailService {
    templateRenderer = new EmailTemplate({
        views: {
            // @ts-ignore
            root: path.join(global.rootDir, 'emailTemplates'),
        },
    });

    public async sendMail(
        userMail: string | undefined,
        action: EmailActionEnum,
        context: {},
    ): Promise<SentMessageInfo> {
        const { subject, templateName } = await emailInfo[action];

        Object.assign(context, { frontendUrl: 'https://google.com' });
        const html = await this.templateRenderer.render(templateName, context);

        const emailTransporter = nodemailer.createTransport({
            from: 'User',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
