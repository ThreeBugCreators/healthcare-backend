import redis from 'redis';
import logger from '../../common/logging/index.js';

const redisConnection = {
    createRedisClient({ host, port, url }) {
        const client = redis.createClient({
            url,
            host,
            port,
        });

        client.on('error', err => {
            logger.error('Error connect redis', err);
        });

        client.on('connect', () => {
            logger.info('Redis connection established');
        });

        return client;
    },
};

export default redisConnection;
