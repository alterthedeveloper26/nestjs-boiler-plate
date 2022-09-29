import { Entity, Column } from 'typeorm';
import { BaseEntity } from '~base/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ length: 500 })
  name: string;

  @Column('text')
  username: string;

  @Column()
  password: string;
}
