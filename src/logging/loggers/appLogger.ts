import { createLogger } from '../loggerFactory';
import { Logger } from 'winston';

const appLogger: Logger = createLogger('app');

export default appLogger;
