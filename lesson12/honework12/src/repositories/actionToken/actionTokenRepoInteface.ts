import { IActionToken, IActionTokenToSave } from '../../entity';

export interface IActionTokenRepo {
    createToken(token: IActionTokenToSave): Promise<IActionToken>;
}
