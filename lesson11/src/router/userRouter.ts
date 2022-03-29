import { Router } from 'express';

import { userController } from '../controller';
import { userMiddleware } from '../middlewares';

export const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.patch('/:id', userMiddleware.checkValidParams, userController.updateUser);
userRouter.delete('/:id', userMiddleware.checkValidParams, userController.deleteUser);
