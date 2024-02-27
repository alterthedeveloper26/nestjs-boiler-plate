import { BadRequestException } from '@nestjs/common';

export class DuplicateCredentialError extends BadRequestException {
  constructor() {
    super('DuplicateEmailOrUsername');
  }
}
