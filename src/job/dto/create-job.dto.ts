import { ApiProperty } from '@nestjs/swagger';
export class CreateJobDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  ten_cong_viec: string;
  @ApiProperty()
  danh_gia: number;
  @ApiProperty()
  gia_tien: number;
  //   @ApiProperty({ required: false })
  //   hinh_anh?: string | null;
  @ApiProperty()
  mo_ta: string;
  @ApiProperty()
  mo_ta_ngan: string;
  @ApiProperty()
  sao_cong_viec: number;
  @ApiProperty()
  ma_chi_tiet_loai_cong_viec: number;
  @ApiProperty()
  ma_nguoi_tao: number;
}
