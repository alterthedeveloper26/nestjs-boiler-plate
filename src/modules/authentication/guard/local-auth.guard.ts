import {
  BadRequestException,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validateSync } from 'class-validator';
import { flattenDeep } from 'lodash';
import { WrongCredentialError } from '~common/errors/authentication/wrong-credential.error';
import { CredentialReqDto } from '../dto/request/credential.request.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<TUser = unknown>(
    err: unknown,
    user: TUser,
    info: unknown,
    context: ExecutionContext
  ): TUser {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    const credentialDto = new CredentialReqDto();
    credentialDto.email = email ? email.trim() : '';
    credentialDto.password = password;

    const errors = validateSync(credentialDto);
    if (errors.length > 0) {
      const errorMessage = flattenDeep(
        errors.map((error) => Object.values(error.constraints))
      );
      throw new BadRequestException({ message: errorMessage });
    }

    if (err) {
      throw err;
    }

    if (!user) {
      throw new WrongCredentialError();
    }

    return user;
  }
}
