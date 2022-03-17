import { Router } from 'express';

import { authController } from '../controller/authController';

export const authRouter = Router();

authRouter.post('/registration', authController.registration);
// authRouter.post('/login', authController.login);
// authRouter.post('/logout', authController.logout);
// authRouter.post('/refresh', authController.refresh);
