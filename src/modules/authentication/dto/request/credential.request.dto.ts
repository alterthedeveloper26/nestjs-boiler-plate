import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH
} from '~common/constants/validation.constant';
import { StandardizeString } from '~common/decorator/standardize-string.decorator';
import { password } from '~common/interfaces';

export class CredentialReqDto {
  @ApiProperty({
    required: true,
    format: 'email'
  })
  @StandardizeString({ toLowerCase: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    required: true
  })
  @StandardizeString({})
  @IsNotEmpty()
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  password: password;
}
