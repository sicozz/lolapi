import Redis from 'redis';

const redisClient = Redis.createClient(6379, '127.0.0.1');

export default redisClient;
