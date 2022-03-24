import Joi from 'joi';

export const paramsValidator = {
    id: Joi.object({
        id: Joi.string()
            .required(),
    }),
};
