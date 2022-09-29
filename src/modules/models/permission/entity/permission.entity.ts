import { Column, Entity } from 'typeorm';

import { BaseEntity } from '~base/base.entity';

@Entity()
export class Auth extends BaseEntity {
  @Column({
    length: 128,
    nullable: false,
  })
  email: string;

  @Column({
    length: 128,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    nullable: false,
    type: 'uuid',
  })
  userId: string;

  @Column({
    nullable: true,
  })
  installationId: string;
}
