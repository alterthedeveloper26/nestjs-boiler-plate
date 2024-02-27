import { Module } from '@nestjs/common';
import { UserModule } from '~models/user/user.module';
import { AuthService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './authentication.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtAccessTokenStrategy } from './strategy/access-token.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { PasswordController } from './password/password.controller';
import { JwtRefreshTokenStrategy } from './strategy/refresh-token.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    JwtAccessTokenStrategy,
    LocalStrategy,
    JwtAuthGuard,
    JwtRefreshTokenStrategy,
  ],
  exports: [AuthService, JwtAuthGuard],
  controllers: [AuthController, PasswordController],
})
export class AuthModule {}
