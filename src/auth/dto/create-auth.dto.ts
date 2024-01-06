import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  phone: string;
  @ApiProperty({ required: false })
  avatar?: string;
  @ApiProperty()
  birthday: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  role: string;
  @ApiProperty({ required: false })
  skill?: string[];
  @ApiProperty({ required: false })
  certification?: string[];
}
