import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TokenPayloadDescription } from '~common/types/token-payload';
import { authConfig } from '~/config/auth.config';
import { UserService } from '~models/user/user.service';
import { JWT_REFRESH_STRATEGY_NAME, REFRESH_TOKEN_HEADER } from '../constant';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_STRATEGY_NAME
) {
  //Note: Do not remove authConfiguration as it is pass down to super
  constructor(
    @Inject(authConfig.KEY)
    private authConfiguration: ConfigType<typeof authConfig>,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(REFRESH_TOKEN_HEADER),
      ignoreExpiration: false,
      secretOrKey: authConfiguration.refreshTokenSecret
    });
  }

  //Passport will build a user object based on the return value
  //attach it as a property on the Request object
  async validate(payload: TokenPayloadDescription) {
    return await this.userService.findOne(payload.userId, {
      relationFullInfoLoad: true
    });
  }
}
