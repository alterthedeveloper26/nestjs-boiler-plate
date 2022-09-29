import { HttpStatus, Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './modules/models/user/user.module';
import { ActionModule } from './modules/models/action/action.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './config/database.config';
import { AccessControlController } from './modules/access-control/access-control.controller';
import { AccessControlModule } from './modules/access-control/access-control.module';
import { PermissionModule } from './modules/models/permission/permission.module';
import { WinstonModule, WinstonModuleAsyncOptions } from 'nest-winston';
import { PRODUCTION } from '~common/constants/environments';
import { LoggerOptions, transports } from 'winston';
import { LoggerModule } from '~shared/logger/logger.module';
import { HealthModule } from './modules/health/health.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ExceptionsFilter } from '~common/filters/exception.filter';
import { LoggingInterceptor } from '~common/interceptors/logging.interceptor';
import { TransformInterceptor } from '~common/interceptors/transform.interceptor';
import { loggerOptions } from './config/logger.config';

@Module({
  imports: [
    UserModule,
    ActionModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    WinstonModule.forRootAsync(loggerOptions),
    TypeOrmModule.forRootAsync(connectionOptions),
    AccessControlModule,
    PermissionModule,
    LoggerModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true,
          transform: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        });
      },
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
  controllers: [AccessControlController],
})
export class AppModule {}
