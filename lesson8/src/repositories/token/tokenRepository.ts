import { getManager } from 'typeorm';

import { IToken, TokenEntity } from '../../entity';
import { ITokenDataToSave } from '../../interfaces';
import { ITokenRepository } from './tokenRepositoryInterface';

class TokenRepository implements ITokenRepository {
    public async createToken(token:ITokenDataToSave):Promise<IToken> {
        return getManager().getRepository(TokenEntity).save(token);
    }

    public async findTokenByUser(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(TokenEntity).findOne({ userId });
    }

    public async deleteByParams(findObject: Partial<IToken>): Promise<void> {
        await getManager().getRepository(TokenEntity).delete(findObject);
    }
}

export const tokenRepository = new TokenRepository();
