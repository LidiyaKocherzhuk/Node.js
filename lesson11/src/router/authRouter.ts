import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middlewares';

export const authRouter = Router();

authRouter.post(
    '/registration',
    userMiddleware.checkValidCreateUser,
    userMiddleware.checkIsUserUniqueForCreate,
    authController.registration,
);

authRouter.post(
    '/login',
    userMiddleware.checkValidLoginUser,
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
