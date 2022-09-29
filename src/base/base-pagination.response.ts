import { ApiProperty } from '@nestjs/swagger';

import { BasePaginationRequest } from '~base/base-pagination.request';

export class BasePaginationResponse extends BasePaginationRequest {
  @ApiProperty({
    type: 'number',
    required: false
  })
  total?: number;

  @ApiProperty({
    type: 'number',
    required: false
  })
  totalPages?: number;
}
