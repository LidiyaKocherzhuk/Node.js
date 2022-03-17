import { Router } from 'express';

import { userController } from '../controller/userController';

export const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.get('/:email', userController.getUserByEmail);
userRouter.post('/', userController.createUser);
userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
