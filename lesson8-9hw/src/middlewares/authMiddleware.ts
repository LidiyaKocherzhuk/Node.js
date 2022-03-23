import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { constants } from '../constans';

class AuthMiddleware {
    async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const
                accessToken = req.get(constants.AUTHORIZATION);

            if (!accessToken) {
                throw new Error('no token');
            }

            const { userId } = await tokenService.verifyToken(accessToken, 'access');
            const userFromToken = await userService.getUserById(userId);

            if (!userFromToken) {
                throw new Error('wrong token');
            }

            req.user = userFromToken;

            next();
        } catch (err: any) {
            res.status(404).json(err.message);
        }
    }

    async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const
                refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new Error('no token');
            }

            const { userId } = await tokenService.verifyToken(refreshToken, 'refresh');
            const userFromToken = await userService.getUserById(userId);

            if (!userFromToken) {
                throw new Error('wrong token');
            }

            req.user = userFromToken;

            next();
        } catch (err: any) {
            res.status(404).json(err.message);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
