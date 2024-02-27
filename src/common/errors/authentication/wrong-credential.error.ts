import { UnauthorizedException } from '@nestjs/common';
import { AuthServiceErrorMessage } from '~common/constants/message/auth-service-message.constant';

export class WrongCredentialError extends UnauthorizedException {
  constructor() {
    super(AuthServiceErrorMessage.EMAIL_PASSWORD_INVALID);
  }
}
