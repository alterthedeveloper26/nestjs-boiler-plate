import { InternalServerErrorException } from '@nestjs/common';
import { HAVE_NOT_GET_INFO_FROM_TOKEN } from '~common/constants/messages';

export class HaveNotDecodedTokenError extends InternalServerErrorException {
  constructor() {
    super(HAVE_NOT_GET_INFO_FROM_TOKEN);
  }
}
