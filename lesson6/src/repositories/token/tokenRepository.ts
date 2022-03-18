import { getManager } from 'typeorm';

import { IToken, TokenEntity } from '../../entity/tokenEntity';
import { ITokenRepository } from './tokenRepositoryInterface';
import { ITokenPair } from '../../interfaces/tokenInterface';

class TokenRepository implements ITokenRepository {
    public async createToken(token: ITokenPair):Promise<IToken> {
        return getManager().getRepository(TokenEntity).save(token);
    }

    public async findTokenByUser(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(TokenEntity).findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();
