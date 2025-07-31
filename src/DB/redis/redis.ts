import { createClient } from 'redis';
import configKeys from '../../config';

const connection = () => {
  const createRedisClient = () => {
    const client = createClient({
      url: configKeys.REDIS_URL
    });
    client.on('error', (err) => {
      console.log('❌ Redis connection error:', err);
      process.exit(1);
    });
    client
      .connect()
      .then(() => {
        console.log('✅ Redis connected');
      })
      .catch((err) => {
        console.log(err);
      });
    return client;
  };

  return {
    createRedisClient
  };
};

export default connection;
