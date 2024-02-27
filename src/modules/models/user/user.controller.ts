import { ValidateUUIDParamDto } from './../../../common/dtos/validate-uuid-param.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Put,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  USER_API_DEFAULT_PATH,
  USER_API_DELETE_ADDITION,
} from '~common/constants/api-path';
import { PermissionAction } from '~common/constants/permission-action';
import { ResourceName } from '~common/constants/resource';
import { SwaggerApiResponseSchema } from '~common/decorator/api-response.decorator';
import { GuardOn } from '~common/decorator/role-guard.decorator';
import { GetCurrentUserInterceptor } from '~common/interceptors/get-current-user.interceptor';
import { CurrentUser } from '~common/decorator/get-current-user.decorator';
import { User } from './entities/user.entity';
import { UpdatePersonalInfoDto } from './dto/update-personal-info.dto';
import { GetUserListDto } from './dto/get-user-list.dto';

@ApiTags(USER_API_DEFAULT_PATH)
@ApiBearerAuth('jwt')
@Controller(USER_API_DEFAULT_PATH)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SwaggerApiResponseSchema({ model: CreateUserDto })
  @GuardOn({
    action: PermissionAction.Create,
    resource: ResourceName.User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @SwaggerApiResponseSchema({
    model: CreateUserDto,
    isArray: true,
    shouldOmitPagination: false,
  })
  @GuardOn({
    action: PermissionAction.Read,
    resource: ResourceName.User,
  })
  @Get()
  findAll(@Query() getUserListDto: GetUserListDto) {
    return this.userService.findAll(getUserListDto);
  }

  @SwaggerApiResponseSchema({
    model: CreateUserDto,
  })
  @UseInterceptors(GetCurrentUserInterceptor)
  @Get('/me')
  getPersonalInfo(@CurrentUser() user: User) {
    return user;
  }

  @SwaggerApiResponseSchema({
    model: CreateUserDto,
  })
  @GuardOn({
    action: PermissionAction.Read,
    resource: ResourceName.User,
  })
  @Get(':id')
  findOne(@Param() dto: ValidateUUIDParamDto) {
    return this.userService.findOne(dto.id, {
      relationFullInfoLoad: true,
    });
  }

  @SwaggerApiResponseSchema({
    model: CreateUserDto,
  })
  @GuardOn({
    action: PermissionAction.Update,
    resource: ResourceName.User,
  })
  @Put(':id')
  updateUserForAdmin(
    @Param() dto: ValidateUUIDParamDto,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUserForAdmin(dto.id, updateUserDto);
  }

  @SwaggerApiResponseSchema({
    model: User,
  })
  @UseInterceptors(GetCurrentUserInterceptor)
  @Patch('/me')
  updatePersonalInfo(
    @CurrentUser() user: User,
    @Body() updatePersonalInfoDto: UpdatePersonalInfoDto
  ) {
    return this.userService.updatePersonalInfo(user, updatePersonalInfoDto);
  }

  @Delete(':id')
  softDelete(@Param() dto: ValidateUUIDParamDto) {
    return this.userService.softDelete(dto.id);
  }

  @Delete(`${USER_API_DELETE_ADDITION}/:id`)
  delete(@Param() dto: ValidateUUIDParamDto) {
    return this.userService.delete(dto.id);
  }

  @Post(':id')
  restore(@Param() dto: ValidateUUIDParamDto) {
    return this.userService.restore(dto.id);
  }
}
