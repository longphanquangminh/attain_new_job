import { ApiProperty } from '@nestjs/swagger';

export class CreateJobTypeDto {
  @ApiProperty()
  ten_loai_cong_viec: string;
}
