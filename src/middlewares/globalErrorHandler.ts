import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import HttpStatusCodes from '../utils/HttpStatusCodes';
import configKeys from '../config';

// Send full error details during development for easier debugging
const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

// Send only essential error info in production to avoid leaking sensitive data
const sendErrorProd = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

// Global error handling middleware
const globalErrorHandler = (
  err: any, // Could be any kind of error: operational or programming
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default to internal server error if statusCode is missing
  err.statusCode = err.statusCode || HttpStatusCodes.INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

  if (configKeys.NODE_ENV === 'development') {
    // Show full error in dev
    sendErrorDev(err, res);
  } else {
    // In production, clone the error safely and hide details
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    sendErrorProd(error as AppError, res);
  }
};

export default globalErrorHandler;
