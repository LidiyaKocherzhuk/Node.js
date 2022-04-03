import Joi from 'joi';

import { regexp } from '../constans';

export const userValidator = {
    createUser: Joi.object({
        firstName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        lastName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        age: Joi.number()
            .integer()
            .min(18)
            .max(100),

        phone: Joi.string()
            .pattern(new RegExp(regexp.PHONE))
            .required(),

        email: Joi.string()
            .regex(regexp.EMAIL)
            .required(),

        password: Joi.string()
            .regex(regexp.PASSWORD)
            .required(),
    }),

    loginUpdateUser: Joi.object({
        email: Joi.string()
            .regex(regexp.EMAIL)
            .required(),

        password: Joi.string()
            .regex(regexp.PASSWORD)
            .required(),
    }),

};
