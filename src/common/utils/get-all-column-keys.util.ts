import { Repository } from 'typeorm';
import { BaseEntity } from '~base/base.entity';

export type ModelKeys<T extends BaseEntity = BaseEntity> = (keyof T)[];

export const defaultExcludedKeys: ModelKeys = [
  'createdBy',
  'createdAt',
  'modifiedBy',
  'modifiedAt',
  'deletedAt',
  'deletedBy',
];

/**
 * Get all columns (including "{select: false}" ones)
 * Refer: https://github.com/typeorm/typeorm/issues/5816#issuecomment-787787989
 * @param repository
 * @returns all column keys
 */
export function getAllColumnKeys<T extends BaseEntity>(
  repository: Repository<T>,
  exclude: (keyof T)[] = defaultExcludedKeys
): (keyof T)[] {
  return repository.metadata.columns
    .map((col) => col.propertyName as keyof T)
    .filter(
      (propertyName) => !exclude || !exclude.includes(propertyName)
    ) as (keyof T)[];
}
