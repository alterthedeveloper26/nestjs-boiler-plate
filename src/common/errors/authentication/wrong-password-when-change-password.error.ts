import { BadRequestException } from '@nestjs/common';
import { WRONG_PASSWORD } from '~common/constants/messages';

export class WrongCurrentPasswordError extends BadRequestException {
  constructor() {
    super(WRONG_PASSWORD);
  }
}
