import { ApiProperty } from '@nestjs/swagger';

export class RegisterApiResDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}
