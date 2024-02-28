import { ForbiddenException } from '@nestjs/common';
import { INACTIVE_USER_LOGIN } from '~common/constants/messages';

export class InactiveUserLoginError extends ForbiddenException {
  constructor() {
    super(INACTIVE_USER_LOGIN);
  }
}
