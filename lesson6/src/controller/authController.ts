import { Request, Response } from 'express';

import { authService } from '../services/authService';

class AuthController {
    public async registration(req: Request, res: Response) {
        const data = await authService.registration(req.body);
        res.cookie(
            'refreshToken',
            data.refreshToken,
            {
                maxAge: 24 * 60 * 60 * 1000, httpOnly: true,
            },
        );
        return res.status(201).json(data);
    }

    // public async login(req:Request, res:Response) {
    // }
    //
    // public async logout(req:Request, res:Response) {
    // }
    //
    // public async refresh(req:Request, res:Response) {
    // }
}

export const authController = new AuthController();
