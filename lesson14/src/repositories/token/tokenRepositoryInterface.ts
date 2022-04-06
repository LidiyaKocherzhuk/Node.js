import { IToken } from '../../entity';

export interface ITokenRepository {
    createToken(token:any):Promise<IToken>;
    findTokenByUser(userId: number): Promise<IToken | undefined>;
}
