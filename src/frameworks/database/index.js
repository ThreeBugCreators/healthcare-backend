import createSchema from './schemas/index.js';
import mongooseConnection from './orm/mongoose.js';
import { mongoDbConfiguration } from '../../configs/index.js';

const databaseConnection = mongooseConnection(mongoDbConfiguration.connectionString);

const setupMongoDB = async () => await databaseConnection.connect();

export {
    createSchema,
    mongooseConnection,
    setupMongoDB,
    databaseConnection,
};
