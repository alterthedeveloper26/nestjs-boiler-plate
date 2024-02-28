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
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  USER_API_DEFAULT_PATH,
  USER_API_DELETE_ADDITION
} from '~common/constants/api-path';
import { SwaggerApiResponseSchema } from '~common/decorator/api-response.decorator';
import { GetCurrentUserInterceptor } from '~common/interceptors/get-current-user.interceptor';
import { CurrentUser } from '~common/decorator/get-current-user.decorator';
import { User } from './entities/user.entity';
import { UpdatePersonalInfoDto } from './dto/update-personal-info.dto';
import { GetUserListDto } from './dto/get-user-list.dto';
import { ValidateUUIDParamDto } from '~common/dtos/validate-uuid-param.dto';
import { JwtAuthGuard } from '~/modules/authentication/guard/jwt-auth.guard';
import { Public } from '~common/decorator/expose-api.decorator';

@ApiTags(USER_API_DEFAULT_PATH)
@ApiBearerAuth('jwt')
@Controller(USER_API_DEFAULT_PATH)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @SwaggerApiResponseSchema({ model: CreateUserDto })
  // TODO: Later can be a new feature
  // @GuardOn({
  //   action: PermissionAction.Create,
  //   resource: ResourceName.User,
  // })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @SwaggerApiResponseSchema({
    model: CreateUserDto,
    isArray: true,
    shouldOmitPagination: false
  })
  @Get()
  findAll(@Query() getUserListDto: GetUserListDto) {
    return this.userService.findAll(getUserListDto);
  }

  @SwaggerApiResponseSchema({
    model: CreateUserDto
  })
  @UseInterceptors(GetCurrentUserInterceptor)
  @Get('/me')
  getPersonalInfo(@CurrentUser() user: User) {
    return user;
  }

  @Public()
  @SwaggerApiResponseSchema({
    model: CreateUserDto
  })
  @Get(':id')
  findOne(@Param() dto: ValidateUUIDParamDto) {
    return this.userService.findOne(dto.id, {
      relationFullInfoLoad: true
    });
  }

  @Public()
  @SwaggerApiResponseSchema({
    model: CreateUserDto
  })
  @Put(':id')
  updateUserForAdmin(
    @Param() dto: ValidateUUIDParamDto,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUserForAdmin(dto.id, updateUserDto);
  }

  @SwaggerApiResponseSchema({
    model: User
  })
  @UseInterceptors(GetCurrentUserInterceptor)
  @Patch('/me')
  updatePersonalInfo(
    @CurrentUser() user: User,
    @Body() updatePersonalInfoDto: UpdatePersonalInfoDto
  ) {
    return this.userService.updatePersonalInfo(user, updatePersonalInfoDto);
  }

  @ApiOperation({
    summary: 'Soft deleted user'
  })
  @Delete(':id')
  softDelete(@Param() dto: ValidateUUIDParamDto) {
    return this.userService.softDelete(dto.id);
  }

  @ApiOperation({
    summary: 'Deleted user'
  })
  @Delete(`${USER_API_DELETE_ADDITION}/:id`)
  delete(@Param() dto: ValidateUUIDParamDto) {
    return this.userService.delete(dto.id);
  }

  @ApiOperation({
    summary: 'Restore soft deleted user'
  })
  @Post(':id')
  restore(@Param() dto: ValidateUUIDParamDto) {
    return this.userService.restore(dto.id);
  }
}
