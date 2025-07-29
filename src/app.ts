import express, { Application, NextFunction } from 'express';
import AppError from './utils/appError';
import userRoutes from './routes/user.routes';
import HttpStatusCodes from './utils/HttpStatusCodes';

const app: Application = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);

//* catch 404 and forward to error handler
app.all(/(.*)/, (req, res, next: NextFunction) => {
  next(new AppError('Not found', HttpStatusCodes.NOT_FOUND));
});

export default app;
