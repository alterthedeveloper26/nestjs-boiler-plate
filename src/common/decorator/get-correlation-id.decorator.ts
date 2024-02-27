import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getCorrelationId } from '~common/utils/get-correlation-id.util';

export const CorrelationId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    return getCorrelationId(ctx);
  }
);
