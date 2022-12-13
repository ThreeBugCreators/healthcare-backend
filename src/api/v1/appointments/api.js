import AppointmentController from './controller.js';
import AppointmentService from './service.js';
import AuthMiddleware from '../../../middlewares/auth.js';

export default function route({
    express,
    redisClient,
    userRepository,
    appointmentRepository,
}) {
    const router = express.Router();
    const service = new AppointmentService({
        userRepository,
        appointmentRepository,
        redisClient,
    });
    const controller = new AppointmentController(service);

    router.route('/')
        .get(
            [
                AuthMiddleware.interceptToken,
            ],
            controller.getAppointments.bind(controller),
        )
        .post(
            [
                AuthMiddleware.interceptToken,
            ],
            controller.createAppointment.bind(controller),
        );

    return router;
}
