// Necessary library
import express from 'express';
import { ValidationError } from 'express-validation';

// Import repository
import logger from '../../common/logging/index.js';
import MongooseRepositoriesContainer from '../database/repositories/index.js';
import Response from '../../common/utils/http-response.js';
// Import route
import * as apiEntry from '../../api/v1/entry.js';
// Import socket wrapup
import integrateSocket from './socket-io/io.js';

export function bootstrapApi({
    app,
    redisUtil: redisClient,
    databaseConnection,
    socket: socketConnection,
}) {
    const {
        userRepository,
        tokenRepository,
        doctorInfoRepository,
        roomRepository,
        messageRepository,
        surveyRepository,
        appointmentRepository,
    } = MongooseRepositoriesContainer.init().get();

    if (socketConnection) {
        setupSocket(socketConnection, {
            userRepository,
            roomRepository,
            messageRepository,
            redisClient,
        });
    }

    const userRouter = apiEntry.userRouting({
        express,
        redisClient,
        repository: userRepository,
    });

    const messageRouter = apiEntry.messageRouting({
        express,
        redisClient,
        messageRepository,
        userRepository,
        roomRepository,
    });

    const authRouter = apiEntry.authRouting({
        express,
        redisClient,
        userRepository,
        tokenRepository,
    });

    const doctorRouter = apiEntry.doctorRouting({
        express,
        redisClient,
        userRepository,
        doctorInfoRepository,
        databaseConnection,
    });

    const roomRouter = apiEntry.roomRouting({
        express,
        redisClient,
        userRepository,
        roomRepository,
        doctorInfoRepository,
    });

    const surveyRouter = apiEntry.surveyRouting({
        express,
        redisClient,
        surveyRepository,
        doctorInfoRepository,
        userRepository,
    });

    const appointmentRouter = apiEntry.appointmentRouting({
        express,
        redisClient,
        userRepository,
        doctorInfoRepository,
        appointmentRepository,
    });

    const apiRoute = express.Router();

    apiRoute.use('/users', userRouter);
    apiRoute.use('/auth', authRouter);
    apiRoute.use('/doctors', doctorRouter);
    apiRoute.use('/rooms', roomRouter);
    apiRoute.use('/messages', messageRouter);
    apiRoute.use('/surveys', surveyRouter);
    apiRoute.use('/appointments', appointmentRouter);

    apiRoute.use((error, _req, res, _next) => {
        logger.error(error);

        if (error instanceof ValidationError) {
            return Response.error({ res, code: error.statusCode, message: 'Validation error', error });
        }

        return Response.error({ res, code: 500, error, message: 'hehe' });
    });

    app.use('/api/v1', apiRoute);
}

function setupSocket(socket, services) {
    integrateSocket(socket, services);
}
