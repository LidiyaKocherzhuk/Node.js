import { getManager } from 'typeorm';

import { IToken, TokenEntity } from '../../entity/tokenEntity';
import { ITokenRepository } from './tokenRepositoryInterface';
import { ITokenDataToSave } from '../../interfaces/tokenInterface';

class TokenRepository implements ITokenRepository {
    public async createToken(token: ITokenDataToSave):Promise<IToken> {
        return getManager().getRepository(TokenEntity).save(token);
    }

    public async findTokenByUser(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(TokenEntity).findOne({ userId });
    }
}

export const tokenRepository = new TokenRepository();
