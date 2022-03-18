import jwt from 'jsonwebtoken';

import { config } from '../config/config';
import { IToken } from '../entity/tokenEntity';
import { tokenRepository } from '../repositories/token/tokenRepository';
import {ITokenDataToSave, ITokenPair} from '../interfaces/tokenInterface';

class TokenService {
    public async generateTokenPair(payload: ITokenDataToSave): Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: '15m' },
        );

        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: '1d' },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string):Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUser(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        return tokenRepository.createToken({ refreshToken, userId });
    }
}

export const tokenService = new TokenService();
