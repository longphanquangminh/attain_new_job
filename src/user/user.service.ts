import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/common/util/response.utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  prisma = new PrismaClient();
  async create(createUserDto: CreateUserDto) {
    try {
      const data = await this.prisma.nguoi_dung.findFirst({
        where: {
          email: createUserDto.email,
        },
      });
      if (data) {
        return responseData(400, 'Email already exist!', '');
      }
      await this.prisma.nguoi_dung.create({
        data: {
          ...createUserDto,
          password: bcrypt.hashSync(createUserDto.password, 10),
        },
      });

      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findAll() {
    try {
      const count = await this.prisma.nguoi_dung.count();
      const data = await this.prisma.nguoi_dung.findMany({
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
        orderBy: {
          id: 'asc',
        },
      });
      return responseData(200, 'Success', { data, count });
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findName(uName) {
    try {
      const data = await this.prisma.nguoi_dung.findMany({
        where: {
          name: {
            contains: uName,
          },
        },
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
      });
      return responseData(200, 'Success', data);
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async findNamePagination(pageIndex, pageSize, keyword) {
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
      const count = await this.prisma.nguoi_dung.count({
        where: {
          name: {
            contains: keyword,
          },
        },
      });
      const data = await this.prisma.nguoi_dung.findMany({
        where: {
          name: {
            contains: keyword,
          },
        },
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

  async findOne(id: number) {
    try {
      const data = await this.prisma.nguoi_dung.findUnique({
        where: {
          id: id,
        },
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
      });
      if (!data) {
        return responseData(400, 'User not found!', '');
      }
      return responseData(200, 'Success', data);
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const data = await this.prisma.nguoi_dung.findUnique({
        where: {
          id: id,
        },
      });
      if (!data) {
        return responseData(400, 'User not found!', '');
      }
      await this.prisma.nguoi_dung.update({
        where: {
          id,
        },
        data: updateUserDto,
      });

      return responseData(200, 'Success', '');
    } catch {
      return responseData(400, 'Error...', '');
    }
  }

  async remove(id: number) {
    try {
      const data = await this.prisma.nguoi_dung.findUnique({
        where: {
          id: id,
        },
      });
      if (!data) {
        return responseData(400, 'User not found!', '');
      }
      await this.prisma.nguoi_dung.delete({
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
