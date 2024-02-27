import { AuthServiceErrorMessage } from '~common/constants/message/auth-service-message.constant';
import { BadRequestException } from '@nestjs/common';

export class WrongCurrentPasswordError extends BadRequestException {
  constructor() {
    super(AuthServiceErrorMessage.WRONG_CURRENT_PASSWORD);
  }
}
