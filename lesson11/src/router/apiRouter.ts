import { Router } from 'express';

import { userRouter, authRouter, emailRouter } from './index';

export const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/email', emailRouter);
