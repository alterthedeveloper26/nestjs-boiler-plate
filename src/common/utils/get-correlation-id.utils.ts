import {
  ArgumentsHost,
  ExecutionContext,
  HttpArgumentsHost,
} from '@nestjs/common/interfaces';
import { v4 } from 'uuid';
import { CORRELATION_ID_HEADER } from '~common/constants/environments';

export function getCorrelationId(argumentHost: ArgumentsHost): string {
  const req = argumentHost.switchToHttp().getRequest();
  return (req.headers?.[CORRELATION_ID_HEADER] as string) || v4();
}
