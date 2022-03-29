import nodemailer, { SentMessageInfo } from 'nodemailer';

import { config } from '../config/config';
import { emailActionEnum, emailInfo } from '../constans';

class EmailService {
    public async sendMail(
        userMail: string | undefined,
        action: emailActionEnum,
    ): Promise<SentMessageInfo> {
        const { subject, html } = await emailInfo[action];

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
