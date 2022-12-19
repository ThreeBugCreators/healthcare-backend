// Necessary library
import express from 'express';
import { ValidationError } from 'express-validation';

// Import repository
import logger from '../../common/logging/index.js';
import MongooseRepositoriesContainer from '../database/repositories/index.js';
import Response from '../../common/utils/http-response.js';
// Import route
import * as apiEntry from '../../api/v1/entry.js';

export function bootstrapApi({
    app,
    redisUtil: redisClient,
}) {
    const {
        userRepository,
        tokenRepository,
    } = MongooseRepositoriesContainer.init().get();

    const userRouter = apiEntry.userRouting({
        express,
        redisClient,
        repository: userRepository,
    });

    const authRouter = apiEntry.authRouting({
        express,
        redisClient,
        userRepository,
        tokenRepository,
    });

    const apiRoute = express.Router();

    apiRoute.use('/users', userRouter);
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

