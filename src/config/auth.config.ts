import { registerAs } from '@nestjs/config';

import { ConfigType } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import {
  ThrottlerAsyncOptions,
  ThrottlerModuleOptions
} from '@nestjs/throttler';
import { getEnv, getEnvNumber } from '~common/utils/env.util';

const FIFTEEN_MINUTES = 15 * 60;

export const authConfig = registerAs('authConfig', () => ({
  saltRounds: getEnvNumber('SALT_ROUNDS', {
    default: 10
  }),
  accessTokenSecret: getEnv('JWT_SECRET'),
  accessTokenExpire: getEnv('JWT_EXPIRE'),
  maxLoginAttemptPerTime: getEnvNumber('MAX_LOGIN_ATTEMPT_PER_TIME', {
    default: 10
  }),
  loginLockTimeInSeconds: getEnvNumber('LOGIN_LOCK_TIME_IN_SECONDS', {
    default: FIFTEEN_MINUTES
  }),
  extractedJwtPayloadKey: getEnv('EXTRACTED_PAYLOAD_KEY', {
    default: 'user'
  }),
  refreshTokenSecret: getEnv('JWT_REFRESH_SECRET'),
  refreshTokenExpire: getEnv('JWT_REFRESH_EXPIRE'),
  tokenFormatVersion: getEnvNumber('TOKEN_FORMAT_VERSION', {
    default: 0
  })
}));

export const jwtOptionFactory: JwtModuleAsyncOptions = {
  useFactory: async (
    authConfiguration: ConfigType<typeof authConfig>
  ): Promise<JwtModuleOptions> => {
    return {
      secret: authConfiguration.accessTokenSecret,
      signOptions: {
        expiresIn: authConfiguration.accessTokenExpire
      }
    };
  },
  inject: [authConfig.KEY]
};

export const throttlerOptionsFactory: ThrottlerAsyncOptions = {
  useFactory: async (
    authConfiguration: ConfigType<typeof authConfig>
  ): Promise<ThrottlerModuleOptions> => {
    return {
      throttlers: [
        {
          ttl: authConfiguration.loginLockTimeInSeconds,
          limit: authConfiguration.maxLoginAttemptPerTime
        }
      ]
    };
  },
  inject: [authConfig.KEY]
};
