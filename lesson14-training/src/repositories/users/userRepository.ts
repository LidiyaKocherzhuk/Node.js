import { getManager } from 'typeorm';
import { IUser, UserEntity } from '../../entityes';

class UserRepository {
    async createUser(data: IUser): Promise<IUser> {
        return getManager().getRepository(UserEntity).create(data);
    }
}

export const userRepository = new UserRepository();
