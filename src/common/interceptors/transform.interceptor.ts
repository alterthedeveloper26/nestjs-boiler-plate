// eslint-disable-next-line import/no-extraneous-dependencies
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { getCorrelationId } from '~common/utils/get-correlation-id.utils';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        data.correlationId = getCorrelationId(context);
        return data;
      }),
    );
  }
}
