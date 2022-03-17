import { Router } from 'express';

import { postController } from '../controller/postController';

export const postRouter = Router();

postRouter.get('/:userId', postController.getPostsByUserId);
