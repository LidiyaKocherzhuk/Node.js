import { Router } from 'express';

import { emailController } from '../controller';
import { emailMiddleware } from '../middlewares/emailMiddleware';

export const emailRouter = Router();

emailRouter.use('/', emailMiddleware.checkValidEmail, emailController.sendEmail);
