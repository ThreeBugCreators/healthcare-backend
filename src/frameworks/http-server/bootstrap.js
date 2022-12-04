// Necessary library
import express from 'express';
import { ValidationError } from 'express-validation';

// Import repository
import logger from '../../common/logging/index.js';
import MongooseRepositoriesContainer from '../database/repositories/index.js';
import Response from '../../common/utils/http-response.js';
// Route
import authRouting from '../../api/v1/auth/api.js';
import doctorRouting from '../../api/v1/doctors/api.js';

export function bootstrapApi({
    app,
    databaseConnection,
    redisUtil: redisClient,
}) {
    MongooseRepositoriesContainer.init();

    const {
        userRepository,
        tokenRepository,
        doctorInfoRepository,
    } = MongooseRepositoriesContainer.get();

    const authRouter = authRouting({
        express,
        redisClient,
        userRepository,
        tokenRepository,
    });

    const doctorRouter = doctorRouting({
        express,
        redisClient,
        userRepository,
        doctorInfoRepository,
        databaseConnection,
    });

    const apiRoute = express.Router();

    apiRoute.use('/auth', authRouter);
    apiRoute.use('/doctors', doctorRouter);

    apiRoute.use((error, _req, res, _next) => {
        logger.error(error);

        if (error instanceof ValidationError) {
            return Response.error({ res, code: error.statusCode, message: 'Validation error', error });
        }

        return Response.error({ res, code: 500, error, message: 'hehe' });
    });

    app.use('/api/v1', apiRoute);
}

