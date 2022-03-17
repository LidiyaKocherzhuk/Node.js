import { Router } from 'express';

import { commentController } from '../controller/commentController';

export const commentRouter = Router();

commentRouter.post('/', commentController.createComment);
commentRouter.get('/:userId', commentController.getCommentsByUserId);
