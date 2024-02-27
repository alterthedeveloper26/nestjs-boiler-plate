import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ApiResponseModel } from '~base/base.response';
import { CORRELATION_ID_HEADER } from '~common/constants/system';

@Injectable()
export class FormatHttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const requestObject = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((interceptorData): ApiResponseModel => {
        const data = interceptorData?.result;
        const pagination = interceptorData?.pagination;
        return {
          result: data ?? interceptorData ?? null,
          pagination: pagination ?? null,
          success: true,
          correlationId: requestObject.headers[CORRELATION_ID_HEADER],
        };
      })
    );
  }
}
