import { UpdateResult } from 'typeorm';

import { IUser } from '../../entity';

export interface IUserRepository {
    getUsers(): Promise<IUser[]>;
    getUserById(id: number): Promise<IUser | undefined>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(user: Partial<IUser>, id: number): Promise<UpdateResult>;
    updateUserPass(user: Partial<IUser>): Promise<UpdateResult>;
    deleteUser(id: number):void;
}
