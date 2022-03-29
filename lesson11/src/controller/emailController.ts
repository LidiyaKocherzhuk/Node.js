import { Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { emailService } from '../services';
import { emailActionEnum } from '../constans';

class EmailController {
    public async sendEmail(req: IRequestExtended, res: Response) {
        try {
            const { email } = req.body;

            await emailService.sendMail(email, emailActionEnum.ACCOUNT_BLOCKED);

            res.status(200).json('email sent successfully');
        } catch (err: any) {
            res.status(400).json(err.message);
        }
    }
}

export const emailController = new EmailController();
