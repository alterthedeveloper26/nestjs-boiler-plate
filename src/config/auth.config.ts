import { registerAs } from '@nestjs/config';

import { ConfigType } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import {
  ThrottlerAsyncOptions,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';
import { getEnvNumber } from '~common/utils/env.util';

const FIFTEEN_MINUTES = 15 * 60;

export const authConfig = registerAs('authConfig', () => ({
  saltRounds: process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10,
  accessTokenSecret: process.env.JWT_SECRET,
  accessTokenExpire: process.env.JWT_EXPIRE,
  maxLoginAttemptPerTime: process.env.MAX_LOGIN_ATTEMPT_PER_TIME
    ? Number(process.env.MAX_LOGIN_ATTEMPT_PER_TIME)
    : 5,
  loginLockTimeInSeconds: process.env.LOGIN_LOCK_TIME_IN_SECONDS
    ? Number(process.env.LOGIN_LOCK_TIME_IN_SECONDS)
    : FIFTEEN_MINUTES,
  extractedJwtPayloadKey: process.env.EXTRACTED_PAYLOAD_KEY
    ? process.env.EXTRACTED_PAYLOAD_KEY
    : 'user',
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
  refreshTokenExpire: process.env.JWT_REFRESH_EXPIRE,
  tokenFormatVersion: getEnvNumber('TOKEN_FORMAT_VERSION', {
    default: 0,
  }),
}));

export const jwtOptionFactory: JwtModuleAsyncOptions = {
  useFactory: async (
    authConfiguration: ConfigType<typeof authConfig>
  ): Promise<JwtModuleOptions> => {
    return {
      secret: authConfiguration.accessTokenSecret,
      signOptions: {
        expiresIn: authConfiguration.accessTokenExpire,
      },
    };
  },
  inject: [authConfig.KEY],
};

export const throttlerOptionsFactory: ThrottlerAsyncOptions = {
  useFactory: async (
    authConfiguration: ConfigType<typeof authConfig>
  ): Promise<ThrottlerModuleOptions> => {
    return {
      throttlers: [
        {
          ttl: authConfiguration.loginLockTimeInSeconds,
          limit: authConfiguration.maxLoginAttemptPerTime,
        },
      ],
    };
  },
  inject: [authConfig.KEY],
};
