import { NextFunction, Response } from 'express';

import { userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error/errorHandler';

class UserMiddleware {
    async checkIfUserExists(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const userFromDb = await userService.getUserByEmail(req.body.email);

            if (!userFromDb) {
                next(new ErrorHandler('User not found', 404));
                return;
            }

            req.user = userFromDb;
            next();
        } catch (err:any) {
            next(err.message);
        }
    }

    async checkIsUserUniqueForCreate(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { email, phone } = req.body;

            const userFromBD = await userService.getUserByParams({ email, phone });

            if (userFromBD) {
                next(new ErrorHandler('User already exist', 400));
                return;
            }

            next();
        } catch (err:any) {
            next(err.message);
        }
    }
}
export const userMiddleware = new UserMiddleware();
