import { NextFunction, Response } from 'express';

import { userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { paramsValidator, userValidator } from '../validator';

class UserMiddleware {
    async checkIfUserExists(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const userFromDb = await userService.getUserByEmail(req.body.email);

            if (!userFromDb) {
                throw new Error('User not found');
            }

            req.user = userFromDb;
            next();
        } catch (err:any) {
            res.status(404).json(err.message);
        }
    }

    async checkIsUserUniqueForCreate(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { email, phone } = req.body;

            const userFromBD = await userService.getUserByParams({ email, phone });

            if (userFromBD) {
                throw new Error('User already exist');
            }

            next();
        } catch (err:any) {
            res.status(400).json(err.message);
        }
    }

    async checkValidCreateUser(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { error } = await userValidator.createUser.validate(req.body);
            if (error) {
                throw new Error('Data is not valid');
            }

            next();
        } catch (err:any) {
            res.status(404).json(err.message);
        }
    }

    async checkValidLoginUpdateUser(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { error } = await userValidator.loginUpdateUser.validate(req.body);

            if (error) {
                throw new Error('Data is not valid');
            }

            next();
        } catch (err:any) {
            res.status(404).json(err.message);
        }
    }

    async checkValidParams(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { error } = await paramsValidator.id.validate(req.params);

            if (error) {
                throw new Error('Data is not valid');
            }

            next();
        } catch (err:any) {
            res.status(404).json(err.message);
        }
    }
}
export const userMiddleware = new UserMiddleware();
