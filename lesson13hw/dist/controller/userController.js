"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const services_1 = require("../services");
class UserController {
    async getUsersPagination(req, res) {
        try {
            const { page = 1, perPage = 20, ...other } = req.query;
            const responseData = await services_1.userService.getUsersPagination(other, +page, +perPage);
            return res.status(200).json(responseData);
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