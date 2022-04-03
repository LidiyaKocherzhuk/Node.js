import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IUser, UserEntity } from '../../entity';
import { IUserRepository } from './userRepositoryInterface';

dayjs.extend(utc);

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

    public async getUserByParams(findUser: Partial<IUser>): Promise<IUser | undefined> {
        return getManager().getRepository(UserEntity).findOne(findUser);
    }

    public async getNewUsers(): Promise<IUser[]> {
        return getManager().getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.createdAt >= :date', {
                date: dayjs().utc().startOf('day').format(),
            })
            .getMany();
    }

    public async createUser(user: IUser): Promise<IUser> {
        return getManager().getRepository(UserEntity).save(user);
    }

    public async updateUser(user: Partial<IUser>, id: number): Promise<UpdateResult> {
        const { password, email } = user;
        return getManager().getRepository(UserEntity)
            .update({ id }, {
                password,
                email,
            });
    }

    public async updateUserPass(user: Partial<IUser>): Promise<UpdateResult> {
        const { password, id } = user;
        return getManager().getRepository(UserEntity)
            .update({ id }, {
                password,
            });
    }

    public async deleteUser(id: number) {
        return getManager().getRepository(UserEntity)
            .softDelete({ id });
    }
}

export const userRepository = new UserRepository();
