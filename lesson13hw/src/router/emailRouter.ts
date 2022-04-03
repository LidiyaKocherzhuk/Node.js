import { Router } from 'express';

import { emailController } from '../controller';
import { emailMiddleware } from '../middlewares';

export const emailRouter = Router();

emailRouter.post('/', emailMiddleware.checkValidEmail, emailController.sendEmail);
