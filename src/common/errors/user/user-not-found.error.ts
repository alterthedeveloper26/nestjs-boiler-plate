import { NotFoundException } from '@nestjs/common';
import { USER_NOT_FOUND } from '~common/constants/messages';

export class UserNotFoundError extends NotFoundException {
  constructor() {
    super(USER_NOT_FOUND);
  }
}
