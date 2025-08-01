import { createLogger } from '../loggerFactory';
import { Logger } from 'winston';

const redisbLogger: Logger = createLogger('redis');

export default redisbLogger;
