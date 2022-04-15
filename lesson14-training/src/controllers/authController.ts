import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';

class AuthController {
    async authRegistration(req: Request, res: Response, next: NextFunction) {
        try {
            const createdUser = await userService.createUser(req.body);
            console.log(createdUser);
        } catch (err) {
            next(err);
        }
    }
}

export const authController = new AuthController();
