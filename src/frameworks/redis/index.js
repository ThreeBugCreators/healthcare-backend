import redisConnection from './connection.js';
import promisify from './redis-promisify.js';
import { redisConfiguration } from '../../configs/index.js';

const setupRedis = async () => {
    const redis = redisConnection.createRedisClient(redisConfiguration);
    await redis.connect();
    return promisify(redis);
};

export { setupRedis };
