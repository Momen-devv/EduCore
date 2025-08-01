import { createLogger } from '../loggerFactory';
import { Logger } from 'winston';

const serverLogger: Logger = createLogger('server');

export default serverLogger;
