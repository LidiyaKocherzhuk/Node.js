"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../services");
class UserController {
    async getUsers(req, res) {
        try {
            const users = await services_1.userService.getUsers();
            return res.status(200).json(users);
        }
        catch (err) {
            return res.json(err);
        }
    }
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await services_1.userService.getUserById(+id);
            return res.status(200).json(user);
        }
        catch (err) {
            return res.json(err);
        }
    }
    async updateUser(req, res) {
        try {
            const { password, email } = req.body;
            const { id } = req.params;
            const updateUser = await services_1.userService.updateUser(password, email, +id);
            return res.status(200).status(201).json(updateUser);
        }
        catch (err) {
            return res.json(err);
        }
    }
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await services_1.userService.deleteUser(+id);
            res.status(204);
        }
        catch (err) {
            res.json(err);
        }
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map