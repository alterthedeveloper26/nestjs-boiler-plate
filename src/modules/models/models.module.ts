import { Module } from '@nestjs/common';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PermissionModule, UserModule, RoleModule],
})
export class ModelsModule {}