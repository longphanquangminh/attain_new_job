import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { responseData } from 'src/common/utils/response.util';

@Injectable()
export class CommentService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async create(token, createCommentDto: CreateCommentDto) {
    try {
      const theJob = await this.prisma.cong_viec.findFirst({
        where: {
          id: createCommentDto.ma_cong_viec,
        },
      });
      if (!theJob) {
        return responseData(400, 'Job not exist!', '');
      }
      const tokenRealData = this.jwtService.decode(token);
      await this.prisma.binh_luan.create({
        data: {
          ...createCommentDto,
          ma_nguoi_binh_luan: tokenRealData.user_id,
          ngay_binh_luan: new Date(),
        },
      });

      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findAll() {
    try {
      const count = await this.prisma.binh_luan.count();
      const data = await this.prisma.binh_luan.findMany({
        include: {
          nguoi_dung: true,
        },
      });
      return responseData(200, 'Success', { data, count });
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.binh_luan.findUnique({
        where: {
          id: id,
        },
        include: {
          nguoi_dung: true,
        },
      });
      if (!data) {
        return responseData(400, 'Comment not found!', '');
      }
      return responseData(200, 'Success', data);
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async update(id: number, token, updateCommentDto: UpdateCommentDto) {
    try {
      const data = await this.prisma.binh_luan.findUnique({
        where: {
          id: id,
        },
      });
      if (!data) {
        return responseData(400, 'Comment not found!', '');
      }
      const tokenRealData = this.jwtService.decode(token);
      if (data.ma_nguoi_binh_luan !== tokenRealData.user_id) {
        return responseData(403, "Forbidden! Not user's comment!", '');
      }
      await this.prisma.binh_luan.update({
        where: {
          id,
        },
        data: { ...updateCommentDto, ngay_binh_luan: new Date() },
      });

      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async remove(id: number, token) {
    try {
      const data = await this.prisma.binh_luan.findUnique({
        where: {
          id: id,
        },
      });
      if (!data) {
        return responseData(400, 'Comment not found!', '');
      }
      const tokenRealData = this.jwtService.decode(token);
      if (data.ma_nguoi_binh_luan !== tokenRealData.user_id) {
        return responseData(403, "Forbidden! Not user's comment!", '');
      }
      await this.prisma.binh_luan.delete({
        where: {
          id,
        },
      });
      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async getCommentsByJob(jobId) {
    try {
      const count = await this.prisma.binh_luan.count({
        where: {
          ma_cong_viec: jobId,
        },
      });
      const data = await this.prisma.binh_luan.findMany({
        where: {
          ma_cong_viec: jobId,
        },
      });
      return responseData(200, 'Success', { data, count });
    } catch {
      return responseData(400, 'Error...', '');
    }
  }
}
