import { createClient } from 'redis';
import configKeys from '../../config';
import redisbLogger from '../../logging/loggers/redisLogger';

const connection = () => {
  const createRedisClient = () => {
    const client = createClient({
      url: configKeys.REDIS_URL
    });
    client.on('error', (err) => {
      redisbLogger.error(`❌ Redis connection error: ${err.stack}`);
      process.exit(1);
    });
    client
      .connect()
      .then(() => {
        redisbLogger.info('✅ Redis connected');
      })
      .catch((err) => {
        redisbLogger.error(`❌ Redis connection failure: ${err.stack}`);
      });
    return client;
  };

  return {
    createRedisClient
  };
};

export default connection;
