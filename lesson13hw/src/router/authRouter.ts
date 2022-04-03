import { Router } from 'express';

import { authController } from '../controller';
import { authMiddleware, emailMiddleware, userMiddleware } from '../middlewares';

export const authRouter = Router();

authRouter.post(
    '/registration',
    userMiddleware.checkValidCreateUser,
    userMiddleware.checkIsUserUniqueForCreate,
    authController.registration,
);

authRouter.post(
    '/login',
    userMiddleware.checkValidLoginUpdateUser,
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

authRouter.post(
    '/forgotPass',
    emailMiddleware.checkValidEmail,
    userMiddleware.checkIfUserExists,
    authController.forgotPass,
);

authRouter.post(
    '/setNewPass',
    userMiddleware.checkPasswordUser,
    authMiddleware.checkActionToken,
    authController.updateUserPass,
);
