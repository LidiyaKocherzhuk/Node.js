import { UpdateResult } from 'typeorm';

import { IUser } from '../../entity';
import { IPaginationResponse } from '../../interfaces';

export interface IUserRepository {
    getUsersPagination(
        searchObject: any,
        page: number,
        skip: number,
        take: number,
    )
        : Promise<IPaginationResponse<IUser>>
    getUserById(id: number): Promise<IUser | undefined>;
    getUserByEmail(email: string): Promise<IUser | undefined>;
    getUserByParams(findUser: Partial<IUser>): Promise<IUser | undefined>;
    getNewUsers(): Promise<IUser[]>;
    createUser(user: IUser): Promise<IUser>;
    updateUserPass(user: Partial<IUser>): Promise<UpdateResult>;
    deleteUser(id: number):void;
}
