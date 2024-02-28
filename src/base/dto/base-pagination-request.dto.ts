import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_KEY,
  PaginationSortingTypeEnum
} from '~common/constants/pagination.constant';

export class BasePaginationRequestDto {
  @ApiProperty({
    type: 'number',
    default: 1,
    required: false
  })
  @IsOptional()
  page?: number = DEFAULT_PAGE_NUMBER;

  @ApiProperty({
    type: 'number',
    default: 10,
    required: false
  })
  @IsOptional()
  pageSize?: number = DEFAULT_PAGE_SIZE;

  @ApiProperty({
    type: 'string',
    required: false
  })
  @IsOptional()
  sortKey?: string = DEFAULT_SORT_KEY;

  @ApiProperty({
    type: 'enum',
    enum: PaginationSortingTypeEnum,
    default: PaginationSortingTypeEnum.DESCENDING,
    required: false
  })
  @IsEnum(PaginationSortingTypeEnum)
  @IsOptional()
  sortType?: PaginationSortingTypeEnum = PaginationSortingTypeEnum.DESCENDING;
}
