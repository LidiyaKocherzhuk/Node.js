import { UpdateResult } from 'typeorm';
import { IUser } from '../../entity';

export interface IUserRepository {
    getUsers(): Promise<IUser[]>;
    getUserById(id: number): Promise<IUser | undefined>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    createUser(user: IUser): Promise<IUser>;
    updateUser(password: string, email: string, id: number): Promise<UpdateResult>;
    deleteUser(id: number):void;
}
