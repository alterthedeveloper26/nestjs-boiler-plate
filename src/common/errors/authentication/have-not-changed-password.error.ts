import { ForbiddenException } from '@nestjs/common';
import { AuthServiceErrorMessage } from '~common/constants/message/auth-service-message.constant';

export class HaveNotChangePasswordError extends ForbiddenException {
  constructor() {
    super(AuthServiceErrorMessage.PASSWORD_NOT_CHANGED);
  }
}
