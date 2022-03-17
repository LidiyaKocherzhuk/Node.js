import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IUser, UserEntity } from '../../entity/userEntity';
import { IUserRepository } from './userRepositoryInterface';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> implements IUserRepository {
    public async getUsers(): Promise<IUser[]> {
        return getManager().getRepository(UserEntity).find();
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return getManager().getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return getManager().getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
    }

    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(UserEntity).save(user);
    }

    public async updateUser(password: string, email: string, id: number): Promise<UpdateResult> {
        return getManager().getRepository(UserEntity)
            .update({ id }, {
                password,
                email,
            });
    }

    public async deleteUser(id: number) {
        return getManager().getRepository(UserEntity)
            .softDelete({ id });
    }
}

export const userRepository = new UserRepository();
