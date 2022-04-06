import { Router } from 'express';

import { userController } from '../controller';
import { userMiddleware } from '../middlewares';

export const userRouter = Router();

userRouter.get('/', userController.getUsersPagination);
userRouter.get('/:id', userController.getUserById);
userRouter.delete('/:id', userMiddleware.checkValidParams, userController.deleteUser);
