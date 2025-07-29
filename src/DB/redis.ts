import { createClient } from 'redis';
import configKeys from '../config';

export const redisClient = createClient({
  url: configKeys.REDIS_URL
});

export const connectRedis = async () => {
  redisClient.on('error', (err) =>
    console.error('❌ Redis connection error:', err)
  );
  await redisClient.connect();
  console.log('✅ Redis connected');
};
