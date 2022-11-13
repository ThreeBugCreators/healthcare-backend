import './load-env.js';
import http from 'http';
import { Server } from 'socket.io';
import logger from './common/logging/index.js';
import { redisConnection, promisify } from './frameworks/redis/index.js';
import { redisConfiguration, mongoDbConfiguration } from './configs/index.js';
import {
    mongooseConnection,
} from './frameworks/database/index.js';
import {
    app,
    configureRouting,
} from './frameworks/http-server/index.js';
import integrateSocket from './frameworks/http-server/socket-io/io.js';

const server = http.createServer(app);

(async () => {
    try {
        process.on('unhandledRejection', (_result, _error) => {
            logger.error(_error);
            process.exit(1);
        });

        const [redisClient] = await Promise.all([
            redisConnection.createRedisClient(redisConfiguration),
            mongooseConnection(mongoDbConfiguration.connectionString).connect(),
        ]);

        await redisClient.connect();

        const socket = new Server(server, {
            cors: {
                origin: '*',
            },
        });

        const redisUtil = promisify(redisClient);

        configureRouting(app, redisUtil);
        integrateSocket(socket, redisUtil);

        server.listen(6969, () => logger.info('Server is listen on PORT 6969'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
