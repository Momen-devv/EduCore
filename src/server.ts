import { Server } from 'http';
import configKeys from './config';
import serverLogger from './logging/loggers/serverLogger';

const serverConfig = (server: Server) => {
  const startServer = () => {
    server.listen(configKeys.PORT, () => {
      serverLogger.info(`✅ Server is running on Port ${configKeys.PORT}`);
    });
  };
  return {
    startServer
  };
};

export default serverConfig;
