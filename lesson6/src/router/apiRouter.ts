import { Router } from 'express';

import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';

export const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/posts', postRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/auth', authRouter);
