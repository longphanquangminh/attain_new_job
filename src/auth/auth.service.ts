import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { responseData } from 'src/common/utils/response.utils';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  prisma = new PrismaClient();
  async register(createAuthDto: CreateAuthDto) {
    const data = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: createAuthDto.email,
      },
    });
    if (data) {
      return responseData(400, 'Email already exist!', '');
    }
    await this.prisma.nguoi_dung.create({
      data: {
        ...createAuthDto,
        password: bcrypt.hashSync(createAuthDto.password, 10),
      },
    });

    return responseData(200, 'Success', '');
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const user = await this.prisma.nguoi_dung.findFirst({
        where: {
          email: loginAuthDto.email,
        },
      });
      if (!user) {
        return responseData(400, 'Email not found!', '');
      }
      if (bcrypt.compareSync(loginAuthDto.password, user.password)) {
        const key = new Date().getTime();
        const token = this.jwtService.sign(
          {
            user_id: user.id,
            key,
          },
          {
            expiresIn: '30d',
            secret: this.configService.get('JWT_SECRET'),
          },
        );

        return responseData(200, 'Login success!', token);
      } else {
        return responseData(400, 'Password is incorrect', '');
      }
    } catch {
      return responseData(400, 'Error...', '');
    }
  }
}
