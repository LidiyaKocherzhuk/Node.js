import { UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { IUser } from '../entity/userEntity';
import { userRepository } from '../repositories/users/userRepository';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        const users = await userRepository.getUsers();
        return users;
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        const user = await userRepository.getUserById(id);
        return user;
    }

    public async getUserByEmail(email:string): Promise<IUser | undefined> {
        const user = await userRepository.getUserByEmail(email);
        return user;
    }

    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hasPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        const createUser = await userRepository.createUser(dataToSave);
        return createUser;
    }

    public async updateUser(password: string, email: string, id: number): Promise<UpdateResult> {
        const updateUser = await userRepository.updateUser(password, email, id);
        return updateUser;
    }

    public async deleteUser(id: number) {
        const deleteUser = await userRepository.deleteUser(id);
        return deleteUser;
    }

    private async _hasPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
