import { IToken } from '../../entity/tokenEntity';

export interface ITokenRepository {
    createToken(token:any):Promise<IToken>;
    findTokenByUser(userId: number): Promise<IToken | undefined>;
}
