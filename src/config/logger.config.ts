import { ConfigService } from '@nestjs/config';
import { LoggerOptions, transports } from 'winston';
import { PRODUCTION } from '~common/constants/system';

export const loggerOptions = {
  useFactory: (configService: ConfigService): LoggerOptions => {
    const env = configService.get<string>('environment');
    const level = env === PRODUCTION ? 'info' : 'debug';

    return {
      level,
      transports: [new transports.Console()]
    };
  },
  inject: [ConfigService]
};
