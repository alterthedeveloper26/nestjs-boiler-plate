import { STAGING } from '~common/constants/system';

export default () => ({
  dbConfig: {
    host: process.env.DB_HOST,
    port: Number(process.env.TYPEORM_PORT),
    connection: process.env.DB_CONNECTION,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_DATABASE,
    useSSL: process.env.DB_SSL === 'true',
  },
  serverConfig: {
    port: Number(process.env.PORT) || 3001,
    host: process.env.HOST || 'localhost',
  },
  serviceName: process.env.SERVICE_NAME || 'user-subscription-service',
  environment: process.env.NODE_ENV || STAGING,
  papertrailConfig: {
    host: process.env.PAPERTRAIL_HOST,
    port: Number(process.env.PAPERTRAIL_PORT) || 41359,
    appName: process.env.PAPERTRAIL_APP_NAME || 'example-app',
  },
});
