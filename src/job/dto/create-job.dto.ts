import { ApiProperty } from '@nestjs/swagger';
export class CreateJobDto {
  @ApiProperty()
  ten_cong_viec: string;
  @ApiProperty()
  danh_gia: number;
  @ApiProperty()
  gia_tien: number;
  @ApiProperty()
  mo_ta: string;
  @ApiProperty()
  mo_ta_ngan: string;
  @ApiProperty()
  sao_cong_viec: number;
  @ApiProperty()
  ma_chi_tiet_loai_cong_viec: number;
}
