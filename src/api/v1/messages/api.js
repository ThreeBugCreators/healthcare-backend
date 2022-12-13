import MessageController from './controller.js';
import MessageService from './service.js';
import AuthMiddleware from '../../../middlewares/auth.js';

export default function route({
    express,
    redisClient,
    userRepository,
    roomRepository,
    messageRepository,
}) {
    const router = express.Router();
    const service = new MessageService({
        userRepository,
        roomRepository,
        redisClient,
        messageRepository,
    });
    const controller = new MessageController(service);

    router.route('/')
        .get(
            [
                AuthMiddleware.interceptToken,
            ],
            controller.getRoomMessages.bind(controller),
        );

    return router;
}
