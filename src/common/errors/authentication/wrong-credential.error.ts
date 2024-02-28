import { UnauthorizedException } from '@nestjs/common';
import { INVALID_CREDENTIAL } from '~common/constants/messages';

export class WrongCredentialError extends UnauthorizedException {
  constructor() {
    super(INVALID_CREDENTIAL);
  }
}
