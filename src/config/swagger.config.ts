import { getEnv, getEnvBoolean } from '~common/utils/env.util';

export const swaggerConfig = {
  isEnabled: getEnvBoolean('SWAGGER_ENABLED', { default: true }),
  path: getEnv('SWAGGER_PATH', { default: 'swagger' }),
  title: getEnv('SWAGGER_TITLE', { default: 'BlueSG BO API' }),
  description: getEnv('SWAGGER_DESCRIPTION', {
    default: 'BlueSG API description',
  }),
  version: getEnv('SWAGGER_VERSION', { default: '1.0' }),
};
