import fs from 'fs';
import path from 'path';
import winston, { Logger, format } from 'winston';

export const jsonFormatter = format.combine(
  format.timestamp(),
  format.json(),
  format.prettyPrint()
);

export const createLogger = (moduleName: string, logLevel = 'info'): Logger => {
  const { combine, timestamp, errors } = winston.format;
  const logFile = process.env.LOG_FILE || 'logs';

  if (!fs.existsSync(logFile)) {
    fs.mkdirSync(logFile, { recursive: true });
  }

  return winston.createLogger({
    level: logLevel,
    format: combine(timestamp(), errors({ stack: true }), jsonFormatter),
    defaultMeta: { module: moduleName },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(logFile, `${moduleName}.log`),
        maxsize: 10 * 1024 * 1024,
        maxFiles: 5
      })
    ],
    exceptionHandlers: [
      new winston.transports.File({
        filename: path.join(logFile, 'exceptions.log')
      })
    ],
    rejectionHandlers: [
      new winston.transports.File({
        filename: path.join(logFile, 'rejections.log')
      })
    ]
  });
};
