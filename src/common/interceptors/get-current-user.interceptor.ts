import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CURRENT_USER_KEY } from '~common/decorator/get-current-user.decorator';
import { HaveNotDecodedTokenError } from '~common/errors/authentication/have-not-decoded-token.error';
import { TokenPayloadDescription } from '~common/interfaces/token-payload';
import { UserService } from '~models/user/user.service';

@Injectable()
export class GetCurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<unknown>> {
    const req = context.switchToHttp().getRequest();

    const token = req.user as TokenPayloadDescription;

    if (!token) {
      throw new HaveNotDecodedTokenError();
    }

    const currentUser = await this.userService.findOne(token.userId, {
      relationFullInfoLoad: true
    });
    req[CURRENT_USER_KEY] = currentUser;

    return next.handle();
  }
}
