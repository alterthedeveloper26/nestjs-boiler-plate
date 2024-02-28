import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REFRESH_TOKEN_HEADER } from '~/modules/authentication/constant';

export const RefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers[REFRESH_TOKEN_HEADER];
  }
);
