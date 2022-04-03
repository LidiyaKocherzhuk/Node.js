import { getManager } from 'typeorm';

import { ActionTokenEntity, IActionToken, IActionTokenToSave } from '../../entity';
import { IActionTokenRepo } from './actionTokenRepoInteface';

class ActionTokenRepository implements IActionTokenRepo {
    public async createToken(token:IActionTokenToSave): Promise<IActionToken> {
        return getManager().getRepository(ActionTokenEntity).save(token);
    }
}

export const actionTokenRepository = new ActionTokenRepository();
