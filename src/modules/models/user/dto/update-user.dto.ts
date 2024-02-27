import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { uniq } from 'lodash';
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
} from '~common/constants/system';
import { StandardizeString } from '~common/decorator/standardize-string.decorator';

export class UpdateUserDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @MaxLength(NAME_MAX_LENGTH)
  @StandardizeString({})
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: 'string',
    example: 'username',
  })
  @MaxLength(USERNAME_MAX_LENGTH)
  @IsNotEmpty()
  @StandardizeString({})
  @IsOptional()
  username?: string;

  @ApiProperty({
    type: 'string',
  })
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  @IsOptional()
  password?: string;

  @ApiProperty({
    type: 'string',
    format: 'email',
  })
  @StandardizeString({ toLowerCase: true })
  @IsEmail()
  @MaxLength(EMAIL_MAX_LENGTH)
  @IsOptional()
  email?: string;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => uniq(value))
  @ArrayNotEmpty()
  @IsOptional()
  roleNames?: string[];

  @ApiProperty({
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  active?: boolean;
}
