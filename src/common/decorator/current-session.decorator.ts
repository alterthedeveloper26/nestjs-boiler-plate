import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayloadDescription } from '~common/types/token-payload';

export const SessionToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): TokenPayloadDescription => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
