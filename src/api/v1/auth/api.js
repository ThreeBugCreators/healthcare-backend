import { validate } from 'express-validation';

import UserController from './controller.js';
import UserService from './service.js';
import {
    registerValidationSchema,
    loginValidationSchema,
} from './validation.js';

export default function route({
    express,
    redisClient,
    userRepository,
    tokenRepository,
}) {
    const router = express.Router();
    const service = new UserService({
        userRepository,
        tokenRepository,
        redisClient,
    });
    const controller = new UserController(service);

    router.route('/login')
        .post(
            [
                validate(loginValidationSchema),
            ],
            controller.handleLogin.bind(controller),
        );

    router.route('/register')
        .post(
            [
                validate(registerValidationSchema),
            ],
            controller.handleRegister.bind(controller),
        );

    router.route('/refresh-token')
        .post(
            [],
            controller.refreshAccessToken.bind(controller),
        );

    return router;
}
