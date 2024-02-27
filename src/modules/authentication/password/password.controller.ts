import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  PASSWORD_API_DEFAULT_PATH,
  RESET_PASSWORD_API_PATH,
} from '~common/constants/api-path';
import { SwaggerApiResponseSchema } from '~common/decorator/api-response.decorator';
import { CurrentUser } from '~common/decorator/get-current-user.decorator';
import { User } from '~models/user/entities/user.entity';
import { AuthService } from '../authentication.service';
import { ChangePasswordResDto } from '../dto/response/change-password.response.dto';
import { GetCurrentUserInterceptor } from '~common/interceptors/get-current-user.interceptor';
import { ChangePasswordReqDto } from '../dto/request/change-password.request.dto';
import { Public } from '~common/decorator/expose-api.decorator';
import { ResetPasswordReqDto } from '../dto/request/reset-password.request.dto';
import { ResetPasswordResDto } from '../dto/response/reset-password.response.dto';

@ApiTags(PASSWORD_API_DEFAULT_PATH)
@Controller()
export class PasswordController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth('jwt')
  @SwaggerApiResponseSchema({ model: ChangePasswordResDto })
  @UseInterceptors(GetCurrentUserInterceptor)
  @Put(PASSWORD_API_DEFAULT_PATH)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordReqDto,
    @CurrentUser() user: User
  ): Promise<ChangePasswordResDto> {
    await this.authService.changePassword(user, changePasswordDto);
    return new ChangePasswordResDto();
  }

  @Public()
  @SwaggerApiResponseSchema({ model: ChangePasswordResDto })
  @Post(RESET_PASSWORD_API_PATH)
  async resetPassword(
    @Param() resetPasswordDto: ResetPasswordReqDto
  ): Promise<ResetPasswordResDto> {
    await this.authService.resetPassword(resetPasswordDto);
    return new ResetPasswordResDto();
  }
}
