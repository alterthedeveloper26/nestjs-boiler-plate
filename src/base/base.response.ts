import { ApiProperty } from '@nestjs/swagger';

import { BasePaginationResponse } from '~base/base-pagination.response';

export class ApiResponseModel<T = unknown> {
  @ApiProperty()
  success: boolean;

  @ApiProperty({
    type: 'string',
    format: 'uuid'
  })
  correlationId?: string;

  @ApiProperty()
  result?: T;

  @ApiProperty()
  message?: string;

  responseCode?: number;

  @ApiProperty({
    type: BasePaginationResponse,
    required: false
  })
  pagination?: BasePaginationResponse;
}
