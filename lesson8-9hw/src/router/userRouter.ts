import { Router } from 'express';

import { userController } from '../controller';
import { userMiddleware } from '../middlewares';

export const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.get('/:email', userController.getUserByEmail);
userRouter.post(
    '/',
    userMiddleware.checkIsUserUniqueForCreate,
    userController.createUser,
);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
