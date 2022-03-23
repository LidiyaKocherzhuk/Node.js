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
        } catch (err) {
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
        } catch (err) {
            res.status(400).json(err.message);
        }
    }

    async checkValidCreateUser(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { error, value } = await userValidator.createUser.validateAsync(req.body);
            if (error) {
                throw new Error('Data is not valid');
            }

            req.body(value);
            next();
        } catch (err) {
            res.status(404).json(err.message);
        }
    }

    async checkValidLoginUser(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { error, value } = await userValidator.loginUser.validate(req.body);

            if (error) {
                throw new Error('Data is not valid');
            }

            req.body(value);
            next();
        } catch (err) {
            res.status(404).json(err.message);
        }
    }

    async checkValidParams(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { error, value } = await paramsValidator.id.validate(req.params);

            if (error) {
                throw new Error('Data is not valid');
            }

            req.body(value);
            next();
        } catch (err) {
            res.status(404).json(err.message);
        }
    }
}
export const userMiddleware = new UserMiddleware();
