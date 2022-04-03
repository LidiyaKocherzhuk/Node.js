import Joi from 'joi';

import { regexp } from '../constans';

export const emailValidator = {
    email: Joi.object({
        email: Joi.string()
            .regex(regexp.EMAIL)
            .required(),
    }),
};
