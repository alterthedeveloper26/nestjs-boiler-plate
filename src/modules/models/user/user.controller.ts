import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(protected readonly userService: UserService) {}

  @Post('/generate')
  createRandomUser() {
    return this.userService.createUser();
  }
}
