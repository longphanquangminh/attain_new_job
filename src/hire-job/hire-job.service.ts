import { Injectable } from '@nestjs/common';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { responseData } from 'src/common/utils/response.util';
import { hireJobQuery } from './queries/hire-job.query';

@Injectable()
export class HireJobService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(token, createHireJobDto: CreateHireJobDto) {
    try {
      const theJob = await this.prisma.thue_cong_viec.findFirst({
        where: {
          ma_cong_viec: createHireJobDto.ma_cong_viec,
        },
      });
      if (theJob) {
        return responseData(400, 'The job already hired!', '');
      }
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
        select: hireJobQuery,
      });
      return responseData(200, 'Success', { count, data });
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.thue_cong_viec.findUnique({
        where: {
          id,
        },
        select: hireJobQuery,
      });
      if (!data) {
        return responseData(400, 'Hired job not found!', '');
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
          id,
        },
      });
      if (!data) {
        return responseData(400, 'Hired job not found!', '');
      }
      const tokenRealData = this.jwtService.decode(token);
      if (data.ma_nguoi_thue !== tokenRealData.user_id) {
        return responseData(403, "Forbidden! Not user's hired job!", '');
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
          id,
        },
      });
      if (!data) {
        return responseData(400, 'Hired job not found!', '');
      }
      const tokenRealData = this.jwtService.decode(token);
      if (data.ma_nguoi_thue !== tokenRealData.user_id) {
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

  async getHiredJobsByUser(token) {
    try {
      const tokenRealData = this.jwtService.decode(token);
      const data = await this.prisma.thue_cong_viec.findMany({
        where: {
          id: tokenRealData.user_id,
        },
        select: hireJobQuery,
      });
      return responseData(200, 'Success', data);
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async postDoneWork(id: number, token) {
    try {
      const data = await this.prisma.thue_cong_viec.findUnique({
        where: {
          id,
        },
      });
      if (!data) {
        return responseData(400, 'Hired job not found!', '');
      }
      const tokenRealData = this.jwtService.decode(token);
      if (data.ma_nguoi_thue !== tokenRealData.user_id) {
        return responseData(403, "Forbidden! Not user's hired job!", '');
      }
      await this.prisma.thue_cong_viec.update({
        where: {
          id,
        },
        data: {
          hoan_thanh: true,
        },
      });
      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }
}
