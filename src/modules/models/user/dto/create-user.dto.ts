import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
} from '~common/constants/system';
import { StandardizeString } from '~common/decorator/standardize-string.decorator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
  })
  @MaxLength(NAME_MAX_LENGTH)
  @StandardizeString({})
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @StandardizeString({})
  @MaxLength(USERNAME_MAX_LENGTH)
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  password: string;

  @ApiProperty({
    type: 'string',
    format: 'email',
  })
  @StandardizeString({ toLowerCase: true })
  @MaxLength(EMAIL_MAX_LENGTH)
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
