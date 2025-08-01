import express, { Application, NextFunction } from 'express';
import connectToMongoDb from './DB/mongodb/mongo';
import connection from './DB/redis/redis';
import serverConfig from './server';
import http from 'http';
import AppError from './utils/appError';
import studentRoute from './routes/student.routes';
import HttpStatusCodes from './utils/HttpStatusCodes';
import errorHandler from './middlewares/globalErrorHandler';
import morgan from 'morgan';
import appLogger from './logging/loggers/appLogger';
import configKeys from './config';

const app: Application = express();
const server = http.createServer(app);

appLogger.info('✅ App initialized');

connectToMongoDb();

const redisClient = connection().createRedisClient();

if (configKeys.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/students', studentRoute);

//* handles server side errors
app.use(errorHandler);

//* catch 404 and forward to error handler
app.all(/(.*)/, (req, res, next: NextFunction) => {
  next(new AppError('Not found', HttpStatusCodes.NOT_FOUND));
});

serverConfig(server).startServer();

export type RedisClient = typeof redisClient;
