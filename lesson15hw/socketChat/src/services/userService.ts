import { getManager } from 'typeorm';

import { IUser, UserEntity } from '../entity';

class UserService {
    getUserByParams(email:string): Promise<IUser | undefined> {
        return getManager().getRepository(UserEntity).findOne({ email });
    }

    createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(UserEntity).save(user);
    }

    async updateUser(id: number, roomId: number): Promise<void> {
        await getManager().getRepository(UserEntity)
            .update(
                { id },
                { roomId },
            );
    }
}

export const userService = new UserService();
