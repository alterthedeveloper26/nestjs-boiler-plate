import { NotFoundException } from '@nestjs/common';
import { UserServiceErrorMessage } from '~common/constants/message/user-service-message.constant';

export class UserNotFoundError extends NotFoundException {
  constructor() {
    super(UserServiceErrorMessage.UserNotFound);
  }
}
