import { InternalServerErrorException } from '@nestjs/common';
import { AuthServiceErrorMessage } from '~common/constants/message/auth-service-message.constant';

export class HaveNotDecodedTokenError extends InternalServerErrorException {
  constructor() {
    super(AuthServiceErrorMessage.HAVE_NOT_DECODED_TOKEN);
  }
}
