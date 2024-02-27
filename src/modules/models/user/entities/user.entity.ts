import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '~base/base.entity';
import { InactiveUserLoginError } from '~common/errors/authentication/inactive-user-login.error';
import { UsedPasswordError } from '~common/errors/authentication/used-password.error';
import { WrongCredentialError } from '~common/errors/authentication/wrong-credential.error';
import { HashHelper } from '~common/utils/hash.util';

@Entity()
export class User extends BaseEntity {
  @Column({ length: 500 })
  name: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    length: 128,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    default: 0,
  })
  failedLoginCount: number;

  @Column({
    type: 'timestamptz',
    default: null,
  })
  lastLoginAttemptTime: Date;

  @Column({
    type: 'timestamptz',
    default: null,
    select: false,
  })
  lastChangePasswordTime: Date;

  @Column({
    default: true,
  })
  active: boolean;

  async validatePassword(password: string) {
    const isValid = await HashHelper.verify(password, this.password);

    if (!isValid) {
      throw new WrongCredentialError();
    }

    if (!this.active) {
      throw new InactiveUserLoginError();
    }

    return this;
  }

  async setPassword(
    newPassword: string,
    saltRounds: number,
    isSystemChanged = false
  ) {
    if (await HashHelper.verify(newPassword, this.password)) {
      throw new UsedPasswordError();
    }
    this.password = await HashHelper.hash(newPassword, saltRounds);

    if (!isSystemChanged) this.lastChangePasswordTime = new Date();

    return this;
  }
}
