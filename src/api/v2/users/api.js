import { validate } from 'express-validation';
import UserController from './controller.js';
import UserService from './service.js';
import { createUserValidation } from './validation.js';

export default function route({
    express,
    redisClient,
    repository,
}) {
    const router = express.Router();
    const service = new UserService({
        repository,
        redisClient,
    });
    const controller = new UserController(service);

    router.route('/:id')
        .get(
            [],
            controller.getUserById.bind(controller),
        );

    router.route('/')
        .get()
        .post(
            [
                validate(createUserValidation),
            ],
            controller.createUser.bind(controller),
        );

    return router;
}
