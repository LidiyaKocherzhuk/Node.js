"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const repositories_1 = require("../repositories");
class UserService {
    async getUsers() {
        return repositories_1.userRepository.getUsers();
    }
    async getUserById(id) {
        return repositories_1.userRepository.getUserById(id);
    }
    async getUserByEmail(email) {
        return repositories_1.userRepository.getUserByEmail(email);
    }
    async getUserByParams(findUser) {
        return repositories_1.userRepository.getUserByParams(findUser);
    }
    async getNewUsers() {
        return repositories_1.userRepository.getNewUsers();
    }
    async createUser(user) {
        const { password } = user;
        const hashedPassword = await this._hasPassword(password);
        const dataToSave = { ...user, password: hashedPassword };
        return repositories_1.userRepository.createUser(dataToSave);
    }
    async updateUser(user, id) {
        const { password } = user;
        if (!password) {
            throw new Error('Wrong data!!!');
        }
        const hashedPassword = await this._hasPassword(password);
        return repositories_1.userRepository.updateUser({ password: hashedPassword, email: user.email }, id);
    }
    async updateUserPass(user) {
        const { password, id } = user;
        if (!password) {
            throw new Error('Wrong data!!!');
        }
        const hashedPassword = await this._hasPassword(password);
        return repositories_1.userRepository.updateUserPass({ password: hashedPassword, id });
    }
    async deleteUser(id) {
        await repositories_1.userRepository.deleteUser(id);
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