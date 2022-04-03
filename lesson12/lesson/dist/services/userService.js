"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../repositories/users/userRepository");
class UserService {
    async getUsers() {
        return userRepository_1.userRepository.getUsers();
    }
    async getUserById(id) {
        return userRepository_1.userRepository.getUserById(id);
    }
    async getUserByEmail(email) {
        return userRepository_1.userRepository.getUserByEmail(email);
    }
    async getUserByParams(findUser) {
        return userRepository_1.userRepository.getUserByParams(findUser);
    }
    async createUser(user) {
        const { password } = user;
        const hashedPassword = await this._hasPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        return userRepository_1.userRepository.createUser(dataToSave);
    }
    async updateUser(password, email, id) {
        return userRepository_1.userRepository.updateUser(password, email, id);
    }
    async deleteUser(id) {
        await userRepository_1.userRepository.deleteUser(id);
    }
    async compareUserPassword(password, hash) {
        const isPasswordUnique = await bcrypt_1.default.compare(password, hash);
        if (!isPasswordUnique) {
            throw new Error('User not exists');
        }
    }
    async _hasPassword(password) {
        return bcrypt_1.default.hash(password, 10);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map