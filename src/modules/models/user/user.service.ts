import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { authConfig } from '~/config/auth.config';
import { HashHelper } from '~common/utils/hash.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { DuplicateCredentialError } from '~common/errors/user/duplicate-credential.error';
import { ModelKeys } from '~common/utils/get-all-column-keys.util';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserNotFoundError } from '~common/errors/user/user-not-found.error';
import { UpdatePersonalInfoDto } from './dto/update-personal-info.dto';
import { GetUserListDto } from './dto/get-user-list.dto';
import { WrongCurrentPasswordError } from '~common/errors/authentication/wrong-password-when-change-password.error';

export class UserService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly userRepo: UserRepository
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { username, email } = createUserDto;
    const saltRounds = this.authConfiguration.saltRounds;
    const hashPassword = await HashHelper.hash(
      createUserDto.password,
      saltRounds
    );
    if (await this.userRepo.isUserNameOrEmailExist(username, email)) {
      throw new DuplicateCredentialError();
    }

    const createdUser = await this.userRepo.save({
      ...createUserDto,
      password: hashPassword
    });

    // NOTE: emit an event for noti

    return { ...createUserDto, id: createdUser.id };
  }

  async findAll(getUserListDto: GetUserListDto) {
    return await this.userRepo.findAndPaginateWithCondition(getUserListDto);
  }

  async getUserLastChangePasswordTime(id: string): Promise<Date> {
    const user = await this.userRepo.findAnUserById(id);
    return user.lastChangePasswordTime;
  }

  async findOneByUserNameOrEmail(input: string) {
    const user = await this.userRepo.findOne({
      where: [{ username: input }, { email: input }]
      // relations: ['roles', 'roles.permissions']
    });

    if (!user) throw new UserNotFoundError();

    return user;
  }

  async updateUserForAdmin(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findAnUserById(id);
    const { username, email } = updateUserDto;

    if (await this.userRepo.isUserNameOrEmailExist(username, email, user.id)) {
      throw new DuplicateCredentialError();
    }

    if (updateUserDto.password) {
      const saltRounds = this.authConfiguration.saltRounds;
      user.password = await HashHelper.hash(updateUserDto.password, saltRounds);
      delete updateUserDto.password;
    }

    return await this.userRepo.save({ ...user, ...updateUserDto });
  }

  async updatePersonalInfo(user: User, dto: UpdatePersonalInfoDto) {
    return await this.userRepo.update(
      {
        id: user.id
      },
      dto
    );
  }

  async findOne(
    id: string,
    queryOptions: {
      withDeleted?: boolean;
      relationIdsLoaded?: boolean;
      relationFullInfoLoad?: boolean;
      excludeFields?: ModelKeys<User>;
      includeFields?: ModelKeys<User>;
      throwIfNotFound?: boolean;
    } = {}
  ): Promise<User> {
    return await this.userRepo.findAnUserById(id, queryOptions);
  }

  async delete(id: string): Promise<DeleteResult> {
    await this.userRepo.findAnUserById(id);
    return await this.userRepo.delete(id);
  }

  async softDelete(id: string): Promise<UpdateResult> {
    await this.userRepo.findAnUserById(id);
    return await this.userRepo.softDelete(id);
  }

  async restore(id: string): Promise<UpdateResult> {
    await this.userRepo.findAnUserById(id, { withDeleted: true });
    return await this.userRepo.restore(id);
  }

  async changePassword(
    user: User,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const isValid = await HashHelper.verify(currentPassword, user.password);
    if (!isValid) {
      throw new WrongCurrentPasswordError();
    }
    await this.setNewPassword(user, newPassword);
  }

  async setNewPassword(
    user: User,
    newPassword: string,
    isSystemChanged = false
  ) {
    const saltRounds = this.authConfiguration.saltRounds;
    await user.setPassword(newPassword, saltRounds, isSystemChanged);
    await this.userRepo.save(user);
  }

  async findUserByUserNameOrEmail(input: string): Promise<User> {
    return await this.userRepo.findOneByUserNameOrEmail(input);
  }
}
