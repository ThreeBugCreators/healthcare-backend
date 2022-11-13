// Necessary library
import express from 'express';
import { ValidationError } from 'express-validation';

// Import repository
import logger from '../../common/logging/index.js';
import MongooseRepositoriesContainer from '../database/repositories/index.js';
import Response from '../../common/utils/http-response.js';
// Route
import authRouting from '../../api/v1/auth/api.js';

export function configureRouting(app, redisClient) {
    const {
        userRepository,
        tokenRepository,
    } = MongooseRepositoriesContainer.init().get();

    const authRouter = authRouting({
        express,
        redisClient,
        userRepository,
        tokenRepository,
    });

    const apiRoute = express.Router();

    apiRoute.use('/auth', authRouter);

    apiRoute.use((error, _req, res, _next) => {
        logger.error(error);

        if (error instanceof ValidationError) {
            return Response.error({ res, code: error.statusCode, message: 'Validation error', error });
        }

        return Response.error({ res, code: 500, error, message: 'hehe' });
    });

    app.use('/api/v1', apiRoute);
}

