const redisConfiguration = {
    url: process.env.REDIS_URI || 'redis://localhost:6379',
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
};

export default redisConfiguration;
