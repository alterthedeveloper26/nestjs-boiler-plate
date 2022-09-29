import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepo: Repository<User>,
  ) {}

  async createUser() {
    let i = 1;
    while (i <= 5) {
      const user = new User();
      user.name = faker.animal.cat();
      user.username =
        user.name.replace(' ', '') + Math.ceil(100 * Math.random());
      user.password = faker.random.word();
      await this.userRepo.save(user);
    }

    return {
      message: 'success!',
    };
  }
}
