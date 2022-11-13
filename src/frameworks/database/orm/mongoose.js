import mongoose from 'mongoose';
import logger from '../../../common/logging/index.js';

const mongooseConnectDB = dbConnectionString => {
    if (!dbConnectionString) {
        throw new Error();
    }

    mongoose.connection.on('error', err => {
        logger.error('MongoDB connection occurred error');
        return err;
    });

    mongoose.connection.once('open', () => {
        logger.info('Connection to MongoDB established');
    });

    mongoose.connection.on('disconnected', () => {
        logger.info('Connection to MongoDB closed');
        logger.info('-------------------');
    });

    return {
        getConnection() {
            return mongoose.connection;
        },
        connect() {
            return mongoose.connect(dbConnectionString);
        },
        close() {
            return mongoose.connection.close();
        },
    };
};

export default mongooseConnectDB;
