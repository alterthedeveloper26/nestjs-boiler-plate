import { IsNotEmpty, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ValidateUUIDParamDto {
  @ApiProperty({
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
