import { Joi } from 'express-validation';

export const createUserValidation = {
    body: Joi.object({
        username: Joi.string().required().min(5),
        password: Joi.string().required().min(5),
        email: Joi.string().email().required(),
        name: Joi.string(),
        surname: Joi.string(),
    }),
};
