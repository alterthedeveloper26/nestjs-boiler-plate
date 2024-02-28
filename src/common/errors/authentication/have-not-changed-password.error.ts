import { ForbiddenException } from '@nestjs/common';
import { PASSWORD_NOT_CHANGED } from '~common/constants/messages';
export class HaveNotChangePasswordError extends ForbiddenException {
  constructor() {
    super(PASSWORD_NOT_CHANGED);
  }
}
