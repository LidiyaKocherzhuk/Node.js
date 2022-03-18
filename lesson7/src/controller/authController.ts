import { Request, Response } from 'express';

import { authService, tokenService } from '../services';
import { IRequestExtended } from '../interfaces';
import { COOKIE } from '../constans/cookie';

class AuthController {
    public async registration(req: Request, res: Response) {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            {
                maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true,
            },
        );
        return res.status(201).json(data);
    }

    // public async login(req:Request, res:Response) {
    // }
    //
    public async logout(req:IRequestExtended, res:Response) {
        const { id } = req.user;

        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteByParams(id);

        return res.status(201).json('ok');
    }
    //
    // public async refresh(req:Request, res:Response) {
    // }
}

export const authController = new AuthController();
