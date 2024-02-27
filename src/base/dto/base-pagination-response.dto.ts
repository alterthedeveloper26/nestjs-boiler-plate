import { ApiProperty } from '@nestjs/swagger';

import { BasePaginationRequestDto } from './base-pagination-request.dto';

export class BasePaginationResponseDto extends BasePaginationRequestDto {
  @ApiProperty({
    type: 'number',
    required: false,
  })
  total?: number;

  @ApiProperty({
    type: 'number',
    required: false,
  })
  totalPages?: number;
}
