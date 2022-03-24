import { Joi, Segments } from 'celebrate';

export const paramsValidator = {
    id: {
        [Segments.PARAMS]: Joi.object({
            id: Joi.string()
                .required(),
        }),
    },
};
