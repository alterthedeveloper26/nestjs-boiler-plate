import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotDuplicatedWith } from '~common/decorator/not-duplicate.decorator';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '~common/constants/validation.constant';

export class ChangePasswordReqDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  password: string;

  @ApiProperty({
    type: 'string',
  })
  @IsNotDuplicatedWith('password')
  @IsNotEmpty()
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  newPassword: string;
}
