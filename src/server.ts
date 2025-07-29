import app from './app';
import configKeys from './config';
import { connectMongo } from './DB/mongo';
import { connectRedis } from './DB/redis';

const PORT = configKeys.PORT;

(async () => {
  await connectMongo();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
  });
})();
