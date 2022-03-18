import jwt from 'jsonwebtoken';

import { config } from '../config/config';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { ITokenPair, IUserPayload } from '../interfaces/tokenInterface';
import { IToken } from '../entity';

class TokenService {
    public async generateTokenPair(payload: IUserPayload): Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: '1d' },
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

        const token = await tokenRepository.createToken({ refreshToken, userId });
        return token;
    }

    public async deleteByParams(userId: number) {
        return tokenRepository.deleteByParams({ userId });
    }

    public async verifyToken(authToken: string, tokenType:string = 'access'): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
