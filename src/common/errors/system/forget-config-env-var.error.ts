import { InternalServerErrorException } from '@nestjs/common';

export class ForgetConfigVariableError extends InternalServerErrorException {
  constructor(key: string) {
    super(`Please config ${key} in your env file!`);
  }
}
