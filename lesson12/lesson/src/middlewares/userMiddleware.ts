import { NextFunction, Response } from 'express';

import { userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { paramsValidator, userValidator } from '../validator';
import { ErrorHandler } from '../error/errorHandler';

class UserMiddleware {
    async checkIfUserExists(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const userFromDb = await userService.getUserByEmail(req.body.email);

            if (!userFromDb) {
                next(new ErrorHandler('User not found', 404));
                return;
            }

            req.user = userFromDb;
            next();
        } catch (err:any) {
            next(err);
        }
    }

    async checkIsUserUniqueForCreate(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { email, phone } = req.body;

            const userFromBD = await userService.getUserByParams({ email, phone });

            if (userFromBD) {
                next(new ErrorHandler('User already exist'));
                return;
            }

            next();
        } catch (err:any) {
            next(err);
        }
    }

    async checkValidCreateUser(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { error, value } = await userValidator.createUser.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message, 404));
                return;
            }

            req.body = value;
            next();
        } catch (err:any) {
            next(err);
        }
    }

    async checkValidLoginUser(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { error, value } = await userValidator.loginUpdateUser.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message, 404));
                return;
            }

            req.body = value;
            next();
        } catch (err:any) {
            next(err.message);
        }
    }

    async checkValidParams(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { error, value } = await paramsValidator.id.validate(req.params);

            if (error) {
                next(new ErrorHandler(error.message, 404));
                return;
            }

            req.body = value;
            next();
        } catch (err:any) {
            next(err);
        }
    }
}
export const userMiddleware = new UserMiddleware();
