import { ApiProperty } from '@nestjs/swagger';
import { BasePaginationResponseDto } from './dto/base-pagination-response.dto';

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
    type: BasePaginationResponseDto,
    required: false
  })
  pagination?: BasePaginationResponseDto;
}
