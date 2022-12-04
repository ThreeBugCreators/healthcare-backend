import './load-env.js';
import http from 'http';
import { Server } from 'socket.io';
import logger from './common/logging/index.js';
import { setupRedis } from './frameworks/redis/index.js';
import {
    setupMongoDB,
    databaseConnection,
} from './frameworks/database/index.js';
import {
    app,
    bootstrapApi,
} from './frameworks/http-server/index.js';

const server = http.createServer(app);

(async () => {
    try {
        process.on('unhandledRejection', (_result, _error) => {
            logger.error(_error);
            process.exit(1);
        });

        const [redisUtil] = await Promise.all([
            setupRedis(),
            setupMongoDB(),
        ]);

        const socket = new Server(server, {
            cors: {
                origin: '*',
            },
        });

        bootstrapApi({ app, redisUtil, databaseConnection, socket });

        server.listen(process.env.PORT || 6969, () => logger.info('Server is listen on PORT 6969'));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
