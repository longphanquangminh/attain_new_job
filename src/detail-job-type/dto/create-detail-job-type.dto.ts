import { ApiProperty } from '@nestjs/swagger';

export class CreateDetailJobTypeDto {
  @ApiProperty()
  ten_chi_tiet: string;
  @ApiProperty({ required: false })
  hinh_anh: string;
  @ApiProperty()
  ma_loai_cong_viec: number;
}
