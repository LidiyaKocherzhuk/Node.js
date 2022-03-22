import { Request, Response } from 'express';

import { authService, tokenService } from '../services';
import { IRequestExtended } from '../interfaces';
import { COOKIE } from '../constans/cookie';
import { IUser } from '../entity';
import { ITokenData } from '../interfaces/tokenInterface';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        try {
            const data = await authService.registration(req.body);
            res.cookie(
                COOKIE.nameRefreshToken,
                data.refreshToken,
                {
                    maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true,
                },
            );
            return res.status(201).json(data);
        } catch (err:any) {
            return res.status(err);
        }
    }

    // public async login(req:Request, res:Response) {
    // }
    //
    public async logout(req:IRequestExtended, res:Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        await tokenService.deleteByParams(id);

        return res.status(201).json('ok');
    }
    //
    // public async refresh(req:Request, res:Response) {
    // }
}

export const authController = new AuthController();
