import { Request, Response } from 'express';

import { IUser } from '../entity';
import { userService } from '../services';

class UserController {
    public async getUsers(req: Request, res: Response): Promise<Response<IUser[]>> {
        try {
            const users = await userService.getUsers();
            return res.status(200).json(users);
        } catch (err) {
            return res.json(err);
        }
    }

    public async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(+id);
            return res.status(200).json(user);
        } catch (err) {
            return res.json(err);
        }
    }

    public async updateUser(req: Request, res: Response):Promise<Response<IUser>> {
        try {
            const { password, email } = req.body;
            const { id } = req.params;
            const updateUser = await userService.updateUser(password, email, +id);
            return res.status(200).status(201).json(updateUser);
        } catch (err) {
            return res.json(err);
        }
    }

    public async deleteUser(req: Request, res: Response):Promise<void> {
        try {
            const { id } = req.params;
            await userService.deleteUser(+id);
            res.status(204);
        } catch (err) {
            res.json(err);
        }
    }
}

export const userController = new UserController();
