import { UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { IUser } from '../entity';
import { userRepository } from '../repositories';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async getUserById(id: number): Promise<IUser | undefined> {
        return userRepository.getUserById(id);
    }

    public async getUserByEmail(email:string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async getUserByParams(findUser: Partial<IUser>): Promise<IUser | undefined> {
        return userRepository.getUserByParams(findUser);
    }

    public async getNewUsers(): Promise<IUser[] | undefined> {
        return userRepository.getNewUsers();
    }

    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;
        const hashedPassword = await this._hasPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        return userRepository.createUser(dataToSave);
    }

    public async updateUser(user: Partial<IUser>, id: number): Promise<UpdateResult> {
        const { password } = user;

        if (!password) {
            throw new Error('Wrong data!!!');
        }
        const hashedPassword = await this._hasPassword(password);

        return userRepository.updateUser({ password: hashedPassword, email: user.email }, id);
    }

    public async updateUserPass(user: Partial<IUser>): Promise<UpdateResult> {
        const { password, id } = user;

        if (!password) {
            throw new Error('Wrong data!!!');
        }
        const hashedPassword = await this._hasPassword(password);

        return userRepository.updateUserPass({ password: hashedPassword, id });
    }

    public async deleteUser(id: number): Promise<void> {
        await userRepository.deleteUser(id);
    }

    public async compareUserPassword(password: string, hash: string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('User not exists');
        }
    }

    private async _hasPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
