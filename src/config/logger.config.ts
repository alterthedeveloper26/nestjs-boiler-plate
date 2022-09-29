import { ConfigService } from '@nestjs/config';
import { LoggerOptions, transports } from 'winston';
import { SyslogTransportOptions } from 'winston-syslog';
import { PRODUCTION } from '~common/constants/environments';

// export const options: SyslogTransportOptions = {
//   protocol: 'tls4',
//   host: papertrailConfig.host,
//   port: papertrailConfig.port,
//   app_name: papertrailConfig.appName,
//   localhost: `${serviceName}-${environment}`,
//   eol: '\n',
// };

export const loggerOptions = {
  useFactory: (configService: ConfigService): LoggerOptions => {
    const env = configService.get<string>('environment');
    const level = env === PRODUCTION ? 'info' : 'debug';

    return {
      level,
      transports: [new transports.Console()],
    };
  },
  inject: [ConfigService],
};
