import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordResDto {
  @ApiProperty({
    default: 'Your new password had been seen to your email!',
    type: 'string',
  })
  message: string = 'Your new password had been seen to your email!';
}
