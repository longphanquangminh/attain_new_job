import { userQuery } from 'src/common/queries/user.query';

export const hireJobQuery = {
  id: true,
  ma_cong_viec: true,
  ma_nguoi_thue: true,
  ngay_thue: true,
  hoan_thanh: true,
  cong_viec: {
    select: {
      id: true,
      ten_cong_viec: true,
      danh_gia: true,
      gia_tien: true,
      hinh_anh: true,
      mo_ta: true,
      mo_ta_ngan: true,
      sao_cong_viec: true,
      ma_chi_tiet_loai_cong_viec: true,
      ma_nguoi_tao: true,
      chi_tiet_loai_cong_viec: {
        select: {
          id: true,
          ten_chi_tiet: true,
        },
      },
      nguoi_dung: {
        select: userQuery,
      },
    },
  },
  nguoi_dung: {
    select: userQuery,
  },
};
