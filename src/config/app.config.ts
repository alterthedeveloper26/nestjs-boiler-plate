import { registerAs } from '@nestjs/config';
import {
  STAGING,
  SERVICE_NAME,
  SERVICE_DEFAULT_PORT,
} from '~common/constants/system';
import { getEnv, getEnvBoolean, getEnvNumber } from '~common/utils/env.util';

export default registerAs('appConfig', () => ({
  port: getEnvNumber('PORT', { default: SERVICE_DEFAULT_PORT }),
  host: getEnv('HOST', { default: 'localhost' }),
  serviceName: getEnv('SERVICE_NAME', { default: SERVICE_NAME }),
  environment: getEnv('NODE_ENV', { default: STAGING }),
  isEnableSwagger: getEnvBoolean('SWAGGER_ENABLED', { default: false }),
}));
