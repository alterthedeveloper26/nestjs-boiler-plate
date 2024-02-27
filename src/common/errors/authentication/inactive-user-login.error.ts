import { ForbiddenException } from '@nestjs/common';
import { AuthServiceErrorMessage } from '~common/constants/message/auth-service-message.constant';

export class InactiveUserLoginError extends ForbiddenException {
  constructor() {
    super(AuthServiceErrorMessage.INACTIVE_USER_LOGIN);
  }
}
