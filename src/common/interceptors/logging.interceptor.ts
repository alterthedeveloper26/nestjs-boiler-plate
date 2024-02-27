import { hostname } from 'os';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { v4 } from 'uuid';
import { ConfigType } from '@nestjs/config';
import { CORRELATION_ID_HEADER } from '~common/constants/system';
import appConfig from '~/config/app.config';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(appConfig.KEY)
    private appConfiguration: ConfigType<typeof appConfig>
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const receivedAt = new Date().getTime();
    const requestPath = `${req.method} ${req.url}`;
    const requestInfo = {
      correlationId: req.headers[CORRELATION_ID_HEADER] ?? v4(),
      serviceName: this.appConfiguration.serviceName,
      fromIp: req.ip,
      method: req.method,
      receivedAt,
    };

    req.requestInfo = requestInfo;
    Logger.log(`Attempting to call API - ${requestPath}`, {
      hostName: hostname(),
      requestInfo,
      ...req.body,
    });

    return next.handle().pipe(
      tap(() => {
        const responseAt = new Date().getTime();
        Logger.log(requestPath, {
          ...requestInfo,
          durations: responseAt - receivedAt,
        });
      })
    );
  }
}
