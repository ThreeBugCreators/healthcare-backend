import { Joi } from 'express-validation';

export const registerValidationSchema = {
    body: Joi.object({
        username: Joi.string().required().min(5),
        password: Joi.string().required().min(5),
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        surname: Joi.string(),
    }),
};

export const loginValidationSchema = {
    body: Joi.object({
        username: Joi.string().required().min(5),
        password: Joi.string().required().min(5),
    }),
};
