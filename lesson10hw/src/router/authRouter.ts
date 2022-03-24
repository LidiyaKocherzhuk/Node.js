import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middlewares';
import { userValidator } from '../validator';

export const authRouter = Router();

authRouter.post(
    '/registration',
    celebrate(userValidator.createUser),
    userMiddleware.checkIsUserUniqueForCreate,
    authController.registration,
);

authRouter.post(
    '/login',
    celebrate(userValidator.loginUpdateUser),
    userMiddleware.checkIfUserExists,
    authController.login,
);

authRouter.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout,
);

authRouter.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh,
);
