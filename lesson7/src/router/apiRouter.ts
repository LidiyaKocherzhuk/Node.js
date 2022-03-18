import { Router } from 'express';

import { userRouter } from './userRouter';
import { authRouter } from './authRouter';

export const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
