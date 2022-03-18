import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';

export const authMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
        const authToken = req.get('Authorization');
        console.log(authToken);

        if (!authToken) {
            throw new Error('no token');
        }
        const { userId } = await tokenService.verifyToken(authToken);
        const userFromToken = await userService.getUserById(userId);

        if (!userFromToken) {
            throw new Error('wrong token');
        }

        req.user = userFromToken;

        next();
    } catch (err: any) {
        res.json(
            {
                status: 400,
                message: err.message,
            },
        );
    }
};
