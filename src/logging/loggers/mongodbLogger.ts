import { createLogger } from '../loggerFactory';
import { Logger } from 'winston';

const mongodbLogger: Logger = createLogger('mongodb');

export default mongodbLogger;
