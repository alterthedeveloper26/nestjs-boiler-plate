import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  AUTH_API_LOGIN_PATH,
  AUTH_API_REFRESH_TOKEN_PATH,
} from '~common/constants/api-path';
import { SwaggerApiResponseSchema } from '~common/decorator/api-response.decorator';
import { Public } from '~common/decorator/expose-api.decorator';
import { AuthService } from './authentication.service';
import { LoginReqDto } from './dto/request/login.request.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginApiResDto } from './dto/response/login-api.response.dto';
import { CustomThrottlerGuard } from './guard/custom-thor.guard';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { RefreshToken } from '~common/decorator/get-refresh-token.decorator';

@ApiTags()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: refactor this, turn it into one decorator
  @ApiBody({
    type: LoginReqDto,
  })
  @SwaggerApiResponseSchema({ model: LoginApiResDto })
  // NOTE: Which guard specify first will get run first
  @UseGuards(CustomThrottlerGuard, LocalAuthGuard)
  @Public()
  @Post(AUTH_API_LOGIN_PATH)
  async login(@Request() req) {
    return this.authService.getTokens(req.user);
  }

  @SwaggerApiResponseSchema({ model: LoginApiResDto })
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post(AUTH_API_REFRESH_TOKEN_PATH)
  async refreshAccessToken(@Request() req, @RefreshToken() token: string) {
    return this.authService.getTokens(req.user, token);
  }
}
