import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JobTypeModule } from './job-type/job-type.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { DetailJobTypeModule } from './detail-job-type/detail-job-type.module';
import { JobModule } from './job/job.module';
import { HireJobModule } from './hire-job/hire-job.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    JobTypeModule,
    DetailJobTypeModule,
    JobModule,
    HireJobModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
