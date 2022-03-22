import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware } from '../middlewares';

export const authRouter = Router();

authRouter.post('/registration', authController.registration);
// authRouter.post('/login', authController.login);
authRouter.post('/logout', authMiddleware, authController.logout);
// authRouter.post('/refresh', authController.refresh);
