import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserServiceErrorMessage } from '~common/constants/message/user-service-message.constant';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOneThrowIfNotFound(id: string) {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });

    if (!user)
      throw new NotFoundException(UserServiceErrorMessage.UserNotFound);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneThrowIfNotFound(id);
    return await this.userRepo.save({ ...user, updateUserDto });
  }

  async delete(id: string) {
    const user = await this.findOneThrowIfNotFound(id);
    return await this.userRepo.delete({ id });
  }

  async softDelete(id: string) {
    const user = await this.findOneThrowIfNotFound(id);
    return await this.userRepo.delete({ id });
  }

  async restore(id: string) {
    const user = await this.findOneThrowIfNotFound(id);
    return await this.userRepo.restore({ id });
  }
}
