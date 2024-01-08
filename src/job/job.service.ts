import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { responseData } from 'src/common/utils/response.util';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JobService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(token, createJobDto: CreateJobDto) {
    const tokenRealData = this.jwtService.decode(token);
    await this.prisma.cong_viec.create({
      data: { ...createJobDto, ma_nguoi_tao: tokenRealData.user_id },
    });

    return responseData(200, 'Success', '');
  }

  async findAll() {
    const count = await this.prisma.cong_viec.count();
    const data = await this.prisma.cong_viec.findMany({
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
    return responseData(200, 'Success', { count, data });
  }

  async findOne(id: number) {
    const data = await this.prisma.cong_viec.findUnique({
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
  }

  async update(id: number, token, updateJobDto: UpdateJobDto) {
    const data = await this.prisma.cong_viec.findUnique({
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
    await this.prisma.cong_viec.update({
      where: {
        id,
      },
      data: updateJobDto,
    });

    return responseData(200, 'Success', '');
  }

  async remove(id: number, token) {
    const data = await this.prisma.cong_viec.findUnique({
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
    await this.prisma.cong_viec.delete({
      where: {
        id,
      },
    });
    return responseData(200, 'Success', '');
  }

  async findJobPagination(pageIndex, pageSize, keyword) {
    if (
      !Number.isInteger(pageIndex) ||
      pageIndex < 1 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      keyword === ''
    ) {
      return responseData(400, 'Bad request', '');
    }
    const count = await this.prisma.cong_viec.count({
      where: {
        ten_cong_viec: {
          contains: keyword,
        },
      },
    });
    const data = await this.prisma.cong_viec.findMany({
      where: {
        ten_cong_viec: {
          contains: keyword,
        },
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
      skip: (pageIndex - 1) * pageSize,
      take: pageSize,
    });
    return responseData(200, 'Success', {
      pageIndex,
      pageSize,
      keyword,
      totalRow: count,
      data,
    });
  }
  async postJobImage(id, token, file: Express.Multer.File) {
    if (!file) {
      return responseData(400, 'File not provided!', '');
    }
    const data = await this.prisma.cong_viec.findUnique({
      where: {
        id,
      },
    });
    if (!data) {
      return responseData(400, 'Job not found!', '');
    }
    const tokenRealData = this.jwtService.decode(token);
    if (data.ma_nguoi_tao !== tokenRealData.user_id) {
      return responseData(403, "Forbidden! Not user's created job!", '');
    }
    await this.prisma.cong_viec.update({
      where: {
        id,
      },
      data: { hinh_anh: file.filename },
    });

    return responseData(200, 'Success', '');
  }
}
