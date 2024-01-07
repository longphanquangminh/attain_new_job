import { Injectable } from '@nestjs/common';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { responseData } from 'src/common/utils/response.utils';

@Injectable()
export class HireJobService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(token, createHireJobDto: CreateHireJobDto) {
    try {
      const tokenRealData = this.jwtService.decode(token);
      await this.prisma.thue_cong_viec.create({
        data: {
          ...createHireJobDto,
          ma_nguoi_thue: tokenRealData.user_id,
          ngay_thue: new Date(),
          hoan_thanh: false,
        },
      });

      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findAll() {
    try {
      const count = await this.prisma.thue_cong_viec.count();
      const data = await this.prisma.thue_cong_viec.findMany({
        select: {
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
                select: {
                  id: true,
                  name: true,
                  email: true,
                  phone: true,
                  avatar: true,
                  birthday: true,
                  gender: true,
                  role: true,
                  skill: true,
                  certification: true,
                },
              },
            },
          },
          nguoi_dung: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              avatar: true,
              birthday: true,
              gender: true,
              role: true,
              skill: true,
              certification: true,
            },
          },
        },
      });
      return responseData(200, 'Success', { data, count });
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.thue_cong_viec.findUnique({
        where: {
          id: id,
        },
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
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              avatar: true,
              birthday: true,
              gender: true,
              role: true,
              skill: true,
              certification: true,
            },
          },
        },
      });
      if (!data) {
        return responseData(400, 'Job not found!', '');
      }
      return responseData(200, 'Success', data);
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async update(id: number, token, updateHireJobDto: UpdateHireJobDto) {
    try {
      const data = await this.prisma.thue_cong_viec.findUnique({
        where: {
          id: id,
        },
      });
      if (!data) {
        return responseData(400, 'Job not found!', '');
      }
      const tokenRealData = this.jwtService.decode(token);
      if (data.ma_nguoi_tao !== tokenRealData.user_id) {
        return responseData(403, "Forbidden! Not user's created job!", '');
      }
      await this.prisma.thue_cong_viec.update({
        where: {
          id,
        },
        data: updateHireJobDto,
      });

      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async remove(id: number, token) {
    try {
      const data = await this.prisma.thue_cong_viec.findUnique({
        where: {
          id: id,
        },
      });
      if (!data) {
        return responseData(400, 'Job not found!', '');
      }
      const tokenRealData = this.jwtService.decode(token);
      if (data.ma_nguoi_tao !== tokenRealData.user_id) {
        return responseData(403, "Forbidden! Not user's created job!", '');
      }
      await this.prisma.thue_cong_viec.delete({
        where: {
          id,
        },
      });
      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }
}
