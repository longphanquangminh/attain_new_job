import { Injectable } from '@nestjs/common';
import { CreateDetailJobTypeDto } from './dto/create-detail-job-type.dto';
import { UpdateDetailJobTypeDto } from './dto/update-detail-job-type.dto';
import { responseData } from 'src/common/util/response.utils';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DetailJobTypeService {
  prisma = new PrismaClient();
  async create(createDetailJobTypeDto: CreateDetailJobTypeDto) {
    try {
      const data = await this.prisma.chi_tiet_loai_cong_viec.findFirst({
        where: {
          ten_chi_tiet: createDetailJobTypeDto.ten_chi_tiet,
        },
      });
      if (data) {
        return responseData(400, 'Detail job type already exist!', '');
      }
      await this.prisma.chi_tiet_loai_cong_viec.create({
        data: createDetailJobTypeDto,
      });

      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findAll() {
    try {
      const count = await this.prisma.chi_tiet_loai_cong_viec.count();
      const data = await this.prisma.chi_tiet_loai_cong_viec.findMany({
        select: {
          id: true,
          ten_chi_tiet: true,
          hinh_anh: true,
          ma_loai_cong_viec: true,
          loai_cong_viec: {
            select: {
              id: true,
              ten_loai_cong_viec: true,
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
      const data = await this.prisma.chi_tiet_loai_cong_viec.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          ten_chi_tiet: true,
          hinh_anh: true,
          ma_loai_cong_viec: true,
          loai_cong_viec: {
            select: {
              id: true,
              ten_loai_cong_viec: true,
            },
          },
        },
      });
      if (!data) {
        return responseData(400, 'Detail job type not found!', '');
      }
      return responseData(200, 'Success', data);
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async update(id: number, updateDetailJobTypeDto: UpdateDetailJobTypeDto) {
    try {
      const data = await this.prisma.chi_tiet_loai_cong_viec.findUnique({
        where: {
          id: id,
        },
      });
      if (!data) {
        return responseData(400, 'Detail job type not found!', '');
      }
      const dataName = await this.prisma.chi_tiet_loai_cong_viec.findFirst({
        where: {
          ten_chi_tiet: updateDetailJobTypeDto.ten_chi_tiet,
        },
      });
      if (dataName && dataName.id != id) {
        return responseData(400, 'Detail job type already exist!', '');
      }
      await this.prisma.chi_tiet_loai_cong_viec.update({
        where: {
          id,
        },
        data: updateDetailJobTypeDto,
      });

      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async remove(id: number) {
    try {
      const data = await this.prisma.chi_tiet_loai_cong_viec.findUnique({
        where: {
          id: id,
        },
      });
      if (!data) {
        return responseData(400, 'Detail job type not found!', '');
      }
      await this.prisma.chi_tiet_loai_cong_viec.delete({
        where: {
          id,
        },
      });
      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findDetailJobTypePagination(pageIndex, pageSize, keyword) {
    try {
      if (
        !Number.isInteger(pageIndex) ||
        pageIndex < 1 ||
        !Number.isInteger(pageSize) ||
        pageSize < 1 ||
        keyword === ''
      ) {
        return responseData(400, 'Bad request', '');
      }
      const count = await this.prisma.chi_tiet_loai_cong_viec.count({
        where: {
          ten_chi_tiet: {
            contains: keyword,
          },
        },
      });
      const data = await this.prisma.chi_tiet_loai_cong_viec.findMany({
        where: {
          ten_chi_tiet: {
            contains: keyword,
          },
        },
        select: {
          id: true,
          ten_chi_tiet: true,
          hinh_anh: true,
          ma_loai_cong_viec: true,
          loai_cong_viec: {
            select: {
              id: true,
              ten_loai_cong_viec: true,
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
    } catch {
      return responseData(400, 'Error...', '');
    }
  }
}
