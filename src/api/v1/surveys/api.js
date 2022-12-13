import SurveyController from './controller.js';
import SurveyService from './service.js';
import AuthMiddleware from '../../../middlewares/auth.js';

export default function route({
    express,
    redisClient,
    userRepository,
    doctorInfoRepository,
    databaseConnection: mongooseConnection,
}) {
    const router = express.Router();
    const service = new SurveyService({
        userRepository,
        doctorInfoRepository,
        redisClient,
        mongooseConnection,
    });
    const controller = new SurveyController(service);

    router.post('/', [
        AuthMiddleware.interceptToken,
    ], controller.submitSurvey.bind(controller));

    return router;
}
