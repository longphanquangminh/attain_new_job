import { ApiProperty } from '@nestjs/swagger';

export class CreateHireJobDto {
  @ApiProperty()
  ma_cong_viec: number;
  ma_nguoi_thue: number;
  ngay_thue: Date | string;
  hoan_thanh: boolean;
}
