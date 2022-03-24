import { Router } from 'express';
import { celebrate } from 'celebrate';

import { userController } from '../controller';
import { paramsValidator, userValidator } from '../validator';

export const userRouter = Router();

userRouter.get(
    '/',
    userController.getUsers,
);

userRouter.get(
    '/:id',
    userController.getUserById,
);

userRouter.patch(
    '/:id',
    celebrate(paramsValidator.id),
    celebrate(userValidator.loginUpdateUser),
    userController.updateUser,
);

userRouter.delete(
    '/:id',
    celebrate(paramsValidator.id),
    userController.deleteUser,
);
