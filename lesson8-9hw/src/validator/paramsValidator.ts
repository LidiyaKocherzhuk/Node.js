import Joi from 'joi';
import { regexp } from '../constans';

export const paramsValidator = {
    id: Joi.object({
        id: Joi.string()
            .required(),
    }),
    email: Joi.object({
        email: Joi.string()
            .regex(regexp.EMAIL)
            .required(),
    }),
};
