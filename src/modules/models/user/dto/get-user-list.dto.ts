import { ApiProperty } from '@nestjs/swagger';
import { IsBooleanString, IsOptional, IsUUID } from 'class-validator';
import { BasePaginationRequestDto } from '~base/dto/base-pagination-request.dto';
import { StandardizeString } from '~common/decorator/standardize-string.decorator';

export class GetUserListDto extends BasePaginationRequestDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  roleId: string;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @StandardizeString({})
  keyword: string;

  @ApiProperty({
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBooleanString()
  active: boolean;
}
