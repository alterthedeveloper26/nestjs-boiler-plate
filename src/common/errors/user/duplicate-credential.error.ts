import { BadRequestException } from '@nestjs/common';
import { USER_DUPLICATE_EMAIL_OR_USERNAME } from '~common/constants/messages';

export class DuplicateCredentialError extends BadRequestException {
  constructor() {
    super(USER_DUPLICATE_EMAIL_OR_USERNAME);
  }
}
