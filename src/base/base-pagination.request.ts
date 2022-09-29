import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationSortingTypeEnum } from '~common/constants/pagination';

export class BasePaginationRequest {
  @ApiProperty({
    type: 'number',
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  // Refer: https://dev.to/avantar/validating-numeric-query-parameters-in-nestjs-gk9
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    type: 'number',
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  // Refer: https://dev.to/avantar/validating-numeric-query-parameters-in-nestjs-gk9
  @IsInt()
  @Type(() => Number)
  pageSize?: number;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  sortKey?: string;

  @ApiProperty({
    type: 'enum',
    enum: PaginationSortingTypeEnum,
    default: PaginationSortingTypeEnum.ASCENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(PaginationSortingTypeEnum)
  sortType?: PaginationSortingTypeEnum;
}
