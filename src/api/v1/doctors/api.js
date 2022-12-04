import DoctorController from './controller.js';
import DoctorService from './service.js';
import AuthMiddleware from '../../../middlewares/auth.js';

export default function route({
    express,
    redisClient,
    userRepository,
    doctorInfoRepository,
    databaseConnection: mongooseConnection,
}) {
    const router = express.Router();
    const service = new DoctorService({
        userRepository,
        doctorInfoRepository,
        redisClient,
        mongooseConnection,
    });
    const controller = new DoctorController(service);

    router.route('/:id')
        .get(
            [
                AuthMiddleware.interceptToken,
            ],
            controller.getById.bind(controller),
        );

    router.route('/')
        .get(
            [
                AuthMiddleware.interceptToken,
            ],
            controller.getDoctors.bind(controller),
        )
        .post(
            [
                AuthMiddleware.interceptToken,
            ],
            controller.createDoctor.bind(controller),
        );

    return router;
}
