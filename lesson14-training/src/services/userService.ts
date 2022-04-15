import { IUser } from '../entityes';
import { userRepository } from '../repositories';

class UserService {
    async createUser(data: IUser): Promise<IUser> {
        return userRepository.createUser(data);
    }
}

export const userService = new UserService();
