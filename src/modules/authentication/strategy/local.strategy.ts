import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '~models/user/entities/user.entity';
import { AuthService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Partial<User>> {
    return await this.authService.login({
      email: email.toLowerCase().trim(),
      password,
    });
  }
}
