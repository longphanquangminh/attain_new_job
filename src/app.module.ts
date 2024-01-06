import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JobTypeModule } from './job-type/job-type.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { DetailJobTypeModule } from './detail-job-type/detail-job-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    JobTypeModule,
    DetailJobTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
