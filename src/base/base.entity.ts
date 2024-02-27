import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date;

  @Column({
    nullable: true,
    select: false,
  })
  createdBy?: string;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  modifiedAt: Date;

  @Column({
    nullable: true,
    select: false,
  })
  modifiedBy?: string;

  @DeleteDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  deletedAt: Date;

  @Column({
    nullable: true,
    select: false,
  })
  deletedBy?: string;
}
