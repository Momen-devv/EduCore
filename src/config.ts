import dotenv from 'dotenv';
dotenv.config();

const configKeys = {
  MONGO_DB_URL: process.env.DATABASE as string,

  PORT: process.env.PORT,

  NODE_ENV: process.env.NODE_ENV as String,

  REDIS_URL: process.env.REDIS_URL as string
};

export default configKeys;
