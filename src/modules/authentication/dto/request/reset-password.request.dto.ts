import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordReqDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
