import { BadRequestException } from '@nestjs/common';

export class UsedPasswordError extends BadRequestException {
  constructor() {
    super('New password must not be the same as old one!');
  }
}
