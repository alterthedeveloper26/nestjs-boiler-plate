import { Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '~base/base.entity';
import { PermissionAction } from '~common/constants/permission-action';
import { Role } from '~models/role/entities/role.entity';
import { User } from '~models/user/entities/user.entity';

export class Permission extends BaseEntity {
  //Note: Denormalize
  @Column()
  roleName: string;

  @Column()
  resource: string;

  @Column({
    type: 'enum',
    enum: PermissionAction,
  })
  actions: string;

  @Column()
  attributes: string;

  @ManyToMany(() => User)
  users: User[];

  @ManyToMany(() => Role)
  roles: Role[];
}
