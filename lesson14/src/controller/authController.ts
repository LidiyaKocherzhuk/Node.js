import { Request, Response } from 'express';

import { UploadedFile } from 'express-fileupload';
import {
    authService,
    emailService,
    tokenService,
    userService,
} from '../services';
import { IRequestExtended, ITokenData, ITokenWithUser } from '../interfaces';
import { constants, ActionTokenType, EmailActionEnum } from '../constans';
import { IUser } from '../entity';
import { tokenRepository, actionTokenRepository } from '../repositories';
import { s3Service } from '../services/s3Service';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        try {
            const avatar = req.files?.avatar as UploadedFile;

            const createdUser = await userService.createUser(req.body);

            if (avatar) {
                s3Service.uploadFile(avatar, 'user', createdUser.id);
            }

            const tokenData = await authService.registration(createdUser);

            return res.status(201).json(tokenData);
        } catch (err:any) {
            return res.status(401).json(err);
        }
    }

    public async login(req:IRequestExtended, res:Response): Promise<Response<ITokenWithUser>> {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;
            console.log(req.body);

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

    public async forgotPass(req:IRequestExtended, res:Response) {
        try {
            const { id, email, firstName } = req.user as IUser;

            const token = tokenService.generateActionToken({
                userId: id,
                userEmail: email,
            });

            await actionTokenRepository.createToken({
                actionToken: token,
                type: ActionTokenType.FORGOT_PASSWORD,
                userId: id,
            });

            await emailService.sendMail(
                email,
                EmailActionEnum.FORGOT_PASSWORD,
                { userName: firstName, token },
            );

            res.status(201).json({ actionToken: token });
        } catch (err) {
            res.status(401).json(err);
        }
    }

    public async updateUserPass(req: IRequestExtended, res: Response):Promise<Response<IUser>> {
        try {
            const { id } = req.user as IUser;
            const { password } = req.body;

            const updateUser = await userService.updateUserPass({ password, id });

            return res.status(200).status(201).json(updateUser);
        } catch (err) {
            return res.json(err);
        }
    }
}

export const authController = new AuthController();
