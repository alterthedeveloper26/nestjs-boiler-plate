import { ApiProperty } from '@nestjs/swagger';

export class LoginApiResDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  access_token: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  refresh_token: string;
}
