import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from '~models/user/entities/user.entity';
import { UserService } from '~models/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { authConfig } from '~/config/auth.config';
import { ConfigType } from '@nestjs/config';
import { LoginApiResDto } from './dto/response/login-api.response.dto';
import { randomBytes } from 'crypto';
import { ChangePasswordReqDto } from './dto/request/change-password.request.dto';
import { ResetPasswordReqDto } from './dto/request/reset-password.request.dto';
import { LoginReqDto } from './dto/request/login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>
  ) {}

  async changePassword(user: User, dto: ChangePasswordReqDto) {
    await this.userService.changePassword(user, dto.password, dto.newPassword);
  }

  async resetPassword(dto: ResetPasswordReqDto) {
    const user = await this.userService.findUserByUserNameOrEmail(dto.email);
    const newPassword = randomBytes(20).toString('hex');
    await this.userService.setNewPassword(user, newPassword, true);
    // NOTE: emit an event here to later send email
  }

  async login(dto: LoginReqDto): Promise<User> {
    const { email, password } = dto;
    const user = await this.userService.findUserByUserNameOrEmail(email);
    await user.validatePassword(password);
    return user;
  }

  async generateAccessToken(user: User): Promise<string> {
    const tokenVersion = this.authConfiguration.tokenFormatVersion;
    const payload = {
      userId: user.id,
    };

    return this.jwtService.sign(payload, {
      secret: this.authConfiguration.accessTokenSecret,
      expiresIn: this.authConfiguration.accessTokenExpire,
    });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload = {
      userId: user.id,
    };

    return await this.jwtService.signAsync(payload, {
      secret: this.authConfiguration.refreshTokenSecret,
      expiresIn: this.authConfiguration.refreshTokenExpire,
    });
  }

  async getTokens(user: User, refreshToken?: string): Promise<LoginApiResDto> {
    return {
      access_token: await this.generateAccessToken(user),
      refresh_token: refreshToken || (await this.generateRefreshToken(user)),
    };
  }
}
