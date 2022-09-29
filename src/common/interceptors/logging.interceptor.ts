import { hostname } from 'os';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { LoggerService } from '~shared/logger/logger.service';
import { CORRELATION_ID_HEADER } from '~common/constants/environments';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    protected readonly loggerService: LoggerService,
    protected readonly configService: ConfigService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const receivedAt = new Date().getTime();
    const requestPath = `${req.method} ${req.url}`;
    const requestInfo = {
      correlationId: req.headers[CORRELATION_ID_HEADER] ?? v4(),
      serviceName: this.configService.get<'string'>('serviceName'),
      fromIp: req.ip,
      method: req.method,
      receivedAt,
    };

    req.requestInfo = requestInfo;
    this.loggerService.info(
      context,
      `Attempting to call API - ${requestPath}`,
      {
        hostName: hostname(),
        requestInfo,
        ...req.body,
      },
    );

    return next.handle().pipe(
      tap(() => {
        const responseAt = new Date().getTime();
        this.loggerService.requestInfo(context, requestPath, {
          ...requestInfo,
          durations: responseAt - receivedAt,
        });
      }),
    );
  }
}
