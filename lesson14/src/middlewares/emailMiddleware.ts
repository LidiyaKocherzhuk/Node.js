import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error/errorHandler';
import { emailValidator } from '../validator';

class EmailMiddleware {
    async checkValidEmail(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { error, value } = await emailValidator.email.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.body = value;
            next();
        } catch (err:any) {
            next(err.message);
        }
    }
}

export const emailMiddleware = new EmailMiddleware();
