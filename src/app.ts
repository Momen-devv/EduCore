import express, { Application, NextFunction } from 'express';
import AppError from './utils/appError';
import studentRoute from './routes/student.routes';
import HttpStatusCodes from './utils/HttpStatusCodes';
import errorHandler from './middlewares/globalErrorHandler';
import morgan from 'morgan';
import configKeys from './config';

const app: Application = express();

if (configKeys.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/students', studentRoute);

//* catch 404 and forward to error handler
app.all(/(.*)/, (req, res, next: NextFunction) => {
  next(new AppError('Not found', HttpStatusCodes.NOT_FOUND));
});

//* handles server side errors
app.use(errorHandler);

export default app;
