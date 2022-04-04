import { Request, Response } from 'express';

import { IUser } from '../entity';
import { userService } from '../services';
import { IPaginationResponse } from '../interfaces';

class UserController {
    public async getUsersPagination(
        req: Request,
        res: Response,
    )
        : Promise<Response<IPaginationResponse<IUser>>> {
        try {
            const { page = 1, perPage = 20, ...other } = req.query;

            const responseData = await userService.getUsersPagination(other, +page, +perPage);

            return res.status(200).json(responseData);
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
