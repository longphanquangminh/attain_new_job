import { Injectable } from '@nestjs/common';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { UpdateJobTypeDto } from './dto/update-job-type.dto';
import { responseData } from 'src/common/utils/response.util';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobTypeService {
  prisma = new PrismaClient();
  async create(createJobTypeDto: CreateJobTypeDto) {
    try {
      const data = await this.prisma.loai_cong_viec.findFirst({
        where: {
          ten_loai_cong_viec: createJobTypeDto.ten_loai_cong_viec,
        },
      });
      if (data) {
        return responseData(400, 'Job type already exist!', '');
      }
      await this.prisma.loai_cong_viec.create({
        data: createJobTypeDto,
      });

      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findAll() {
    try {
      const count = await this.prisma.loai_cong_viec.count();
      const data = await this.prisma.loai_cong_viec.findMany();
      return responseData(200, 'Success', { count, data });
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.loai_cong_viec.findUnique({
        where: {
          id,
        },
      });
      if (!data) {
        return responseData(400, 'Job type not found!', '');
      }
      return responseData(200, 'Success', data);
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async update(id: number, updateJobTypeDto: UpdateJobTypeDto) {
    try {
      const data = await this.prisma.loai_cong_viec.findUnique({
        where: {
          id,
        },
      });
      if (!data) {
        return responseData(400, 'Job type not found!', '');
      }
      await this.prisma.loai_cong_viec.update({
        where: {
          id,
        },
        data: updateJobTypeDto,
      });

      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async remove(id: number) {
    try {
      const data = await this.prisma.loai_cong_viec.findUnique({
        where: {
          id,
        },
      });
      if (!data) {
        return responseData(400, 'Job type not found!', '');
      }
      await this.prisma.loai_cong_viec.delete({
        where: {
          id,
        },
      });
      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findJobTypePagination(pageIndex, pageSize, keyword) {
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
      const count = await this.prisma.loai_cong_viec.count({
        where: {
          ten_loai_cong_viec: {
            contains: keyword,
          },
        },
      });
      const data = await this.prisma.loai_cong_viec.findMany({
        where: {
          ten_loai_cong_viec: {
            contains: keyword,
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
