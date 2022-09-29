import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '~base/base.entity';
import { Permission } from '~models/permission/entities/permission.entity';
import { Role } from '~models/role/entities/role.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ length: 500 })
  name: string;

  @Column('text')
  username: string;

  @Column()
  password: string;

  @Column({
    length: 128,
    nullable: false,
  })
  email: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
  })
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'user_permission',
  })
  permissions: Permission[];
}
