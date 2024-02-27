import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CredentialReqDto } from './credential.request.dto';

export class RegisterReqDto extends CredentialReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 128)
  @Transform(({ value }: TransformFnParams) => value.trim())
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 128)
  @Transform(({ value }: TransformFnParams) => value.trim())
  lastName: string;

  @ApiProperty({
    format: 'date',
  })
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @IsUUID()
  @IsNotEmpty()
  subscriptionPlanId: string;
}
