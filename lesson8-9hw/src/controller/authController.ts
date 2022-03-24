import { Request, Response } from 'express';

import { authService, tokenService, userService } from '../services';
import { IRequestExtended, ITokenData, ITokenWithUser } from '../interfaces';
import { constants } from '../constans';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        try {
            const data = await authService.registration(req.body);

            return res.status(201).json(data);
        } catch (err:any) {
            return res.status(err);
        }
    }

    public async login(req:IRequestExtended, res:Response): Promise<Response<ITokenWithUser>> {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPassword(password, hashPassword);

            const { accessToken, refreshToken } = tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            return res.status(201).json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (err:any) {
            return res.status(404).json(err.message);
        }
    }

    public async logout(req:IRequestExtended, res:Response): Promise<Response<string>> {
        try {
            const { id } = req.user as IUser;

            await tokenService.deleteByParams(id);

            return res.status(201).json('ok');
        } catch (err) {
            return res.status(401).json(err);
        }
    }

    public async refresh(req:IRequestExtended, res:Response): Promise<Response<ITokenWithUser>> {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenToDelete = req.get(constants.AUTHORIZATION);

            await tokenRepository.deleteByParams({ refreshToken: refreshTokenToDelete });

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            return res.status(201).json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (err) {
            return res.status(401).json(err);
        }
    }
}

export const authController = new AuthController();
