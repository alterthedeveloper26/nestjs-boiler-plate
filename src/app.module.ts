import { HttpStatus, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { connectionOptions, databaseConfig } from './config/database.config';
import { LoggerModule } from '~shared/logger/logger.module';
import { HealthModule } from './modules/health/health.module';
import { ExceptionsFilter } from '~common/filters/exception.filter';
import { LoggingInterceptor } from '~common/interceptors/logging.interceptor';
import { FormatHttpResponseInterceptor } from '~common/interceptors/format-http-response.interceptor';
import { loggerOptions } from './config/logger.config';
import { AsyncLocalStorageModule } from '~shared/async-local-storage/async-local-storage.module';
import { AuthModule } from './modules/authentication/authentication.module';
import { ModelsModule } from '~models/models.module';
import { appConfig } from './config/app.config';
import { authConfig, throttlerOptionsFactory } from './config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig, authConfig],
      isGlobal: true
    }),
    WinstonModule.forRootAsync(loggerOptions),
    TypeOrmModule.forRootAsync(connectionOptions),
    ThrottlerModule.forRootAsync(throttlerOptionsFactory),
    LoggerModule,
    HealthModule,
    AuthModule,
    AsyncLocalStorageModule,
    ModelsModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: FormatHttpResponseInterceptor
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          transform: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter
    }
  ],
  controllers: []
})
export class AppModule {}
