import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { constants } from '../constans';
import { ErrorHandler } from '../error/errorHandler';

class AuthMiddleware {
    async checkAccessToken(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const accessToken = req.get(constants.AUTHORIZATION);

            if (!accessToken) {
                next(new ErrorHandler('no token'));
                return;
            }

            const { userId } = await tokenService.verifyToken(accessToken, 'access');
            const userFromToken = await userService.getUserById(userId);

            if (!userFromToken) {
                next(new ErrorHandler('wrong token', 404));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (err: any) {
            next(err);
        }
    }

    async checkRefreshToken(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                next(new ErrorHandler('no token'));
                return;
            }

            const { userId } = await tokenService.verifyToken(refreshToken, 'refresh');
            const userFromToken = await userService.getUserById(userId);

            if (!userFromToken) {
                next(new ErrorHandler('wrong token', 404));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (err: any) {
            next(err);
        }
    }

    async checkActionToken(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const actionToken = req.get('Authorization');

            if (!actionToken) {
                next(new ErrorHandler('no token'));
                return;
            }

            const { userId } = await tokenService.verifyToken(actionToken, 'action');
            const userFromToken = await userService.getUserById(userId);

            req.user = userFromToken;

            next();
        } catch (err: any) {
            next(err);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
