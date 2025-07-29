import express, { Application, NextFunction } from 'express';
import AppError from './utils/appError';

const app: Application = express();

app.use(express.json());

app.get('*', (req, res, next: NextFunction) => {
  next(new AppError('Not found', 404));
});

export default app;
