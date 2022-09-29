import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { LoggerService } from '~shared/logger/logger.service';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
