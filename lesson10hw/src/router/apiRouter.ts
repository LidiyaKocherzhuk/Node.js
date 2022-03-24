import { Router } from 'express';

import { userRouter } from './userRouter';
import { authRouter } from './authRouter';

export const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/auth', authRouter);

// @ts-ignore
authRouter.use('*', (err, req, res, nex) => {
    res
        .status(err.code || 500)
        .json({
            message: err.message,
            date: err.data,
        });
});
