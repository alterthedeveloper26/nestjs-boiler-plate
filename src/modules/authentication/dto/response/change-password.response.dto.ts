import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordResDto {
  @ApiProperty({
    default: 'Your password had been updated successfully!',
    type: 'string',
  })
  message: string = 'Your password had been updated successfully!';
}
