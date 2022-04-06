import jwt from 'jsonwebtoken';

import { config } from '../config';
import { tokenRepository } from '../repositories';
import { ITokenDataToSave, ITokenPair, IUserPayload } from '../interfaces';
import { IToken } from '../entity';

class TokenService {
    public generateActionToken(payload: IUserPayload): string {
        return jwt.sign(
            payload,
            config.SECRET_ACTION_KEY as string,
            { expiresIn: config.MAX_AGE_ACTION_TOKEN },
        );
    }

    public generateTokenPair(payload: IUserPayload): ITokenPair {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.MAX_AGE_ACCESS_TOKEN },
        );

        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.MAX_AGE_REFRESH_TOKEN },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(payload: ITokenDataToSave): Promise<IToken> {
        const { userId, refreshToken, accessToken } = payload;

        const tokenFromDb = await tokenRepository.findTokenByUser(userId);

        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        return tokenRepository.createToken({ refreshToken, accessToken, userId });
    }

    public async deleteByParams(userId: number): Promise<void> {
        await tokenRepository.deleteByParams({ userId });
    }

    public async verifyToken(authToken: string, tokenType:string): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }
        if (tokenType === 'action') {
            secretWord = config.SECRET_ACTION_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
