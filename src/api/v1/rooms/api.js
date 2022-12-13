import RoomController from './controller.js';
import RoomService from './service.js';
import AuthMiddleware from '../../../middlewares/auth.js';

export default function route({
    express,
    redisClient,
    userRepository,
    roomRepository,
    doctorInfoRepository,
}) {
    const router = express.Router();
    const service = new RoomService({
        redisClient,
        userRepository,
        roomRepository,
        doctorInfoRepository,
    });
    const controller = new RoomController(service);

    router.route('/:doctorId')
        .post(
            [
                AuthMiddleware.interceptToken,
            ],
            controller.createRoom.bind(this),
        );

    router.route('/')
        .get(
            [
                AuthMiddleware.interceptToken,
            ],
            controller.getRooms.bind(this),
        );

    return router;
}
