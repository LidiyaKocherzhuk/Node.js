import { Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { emailService } from '../services';
import { EmailActionEnum } from '../constans';

class EmailController {
    public async sendEmail(req: IRequestExtended, res: Response): Promise<Response<string>> {
        try {
            const { email } = req.body;

            await emailService.sendMail(email, EmailActionEnum.WELCOME, { userName: 'Lidiya' });

            return res.status(200).json('email sent successfully');
        } catch (err: any) {
            return res.status(400).json(err.message);
        }
    }
}

export const emailController = new EmailController();
