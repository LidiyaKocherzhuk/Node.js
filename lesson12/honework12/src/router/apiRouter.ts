import { Router } from 'express';

import { authRouter } from './authRouter';
import { emailRouter } from './emailRouter';
import { userRouter } from './userRouter';

export const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/email', emailRouter);
