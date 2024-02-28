import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { NAME_MAX_LENGTH } from '~common/constants/validation.constant';
import { StandardizeString } from '~common/decorator/standardize-string.decorator';

export class UpdatePersonalInfoDto {
  @ApiProperty({
    type: 'string'
  })
  @IsNotEmpty()
  @StandardizeString({})
  @IsOptional()
  @MaxLength(NAME_MAX_LENGTH)
  name?: string;
}
