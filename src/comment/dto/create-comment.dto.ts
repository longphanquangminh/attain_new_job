import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  ma_cong_viec: number;
  ma_nguoi_binh_luan: number;
  ngay_binh_luan: Date | string;
  @ApiProperty()
  noi_dung: string;
  @ApiProperty()
  sao_binh_luan: number;
}
