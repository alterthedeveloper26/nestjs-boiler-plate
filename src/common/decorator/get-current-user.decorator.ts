import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '~models/user/entities/user.entity';

export const CURRENT_USER_KEY = 'current_user';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request[CURRENT_USER_KEY];
  }
);
