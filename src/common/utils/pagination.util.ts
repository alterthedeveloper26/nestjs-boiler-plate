import { SelectQueryBuilder } from 'typeorm';
import { BasePaginationRequestDto } from '~base/base-pagination-request.dto';
import { BasePaginationResponseDto } from '~base/base-pagination-response.dto';
import { PaginationSortingTypeEnum } from '~common/constants/pagination';

/**
 * Generate TypeORM pagination
 * @param object
 * @returns object
 */
export const generatePagination = ({
  sortKey,
  sortType,
  page,
  pageSize,
}: BasePaginationRequestDto): {
  order: Record<string, unknown>;
  take: number;
  skip: number;
} => ({
  order:
    sortKey && sortKey != 'modifiedAt'
      ? {
          [sortKey]: sortType,
          ['modifiedAt']: PaginationSortingTypeEnum.DESCENDING,
        }
      : { ['modifiedAt']: sortType },
  take: pageSize,
  skip: page * pageSize - pageSize,
});

export function createPaginationResponse(
  data: BasePaginationRequestDto,
  total: number
): BasePaginationResponseDto {
  const { page, pageSize, sortKey, sortType } = data;
  return {
    page,
    pageSize,
    sortKey,
    sortType,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
}

/**
 *
 * @param query queryBuilder entity that you want to append
 * @param queryParams pagination condition
 * @param entityName entity name that you use to name the query builder
 * @returns queryBuilder object
 */
export function appendPagination<T>(
  query: SelectQueryBuilder<T>,
  { page, pageSize, sortKey, sortType }: BasePaginationRequestDto,
  entityName: string
) {
  const take = pageSize;
  const skip = page * pageSize - pageSize;

  query.orderBy(`${entityName}.${sortKey}`, sortType).take(take).skip(skip);

  return query;
}
