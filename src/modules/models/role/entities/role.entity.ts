import { Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '~base/base.entity';
import { User } from '~models/user/entities/user.entity';

export class Role extends BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => User)
  users: User[];
}
