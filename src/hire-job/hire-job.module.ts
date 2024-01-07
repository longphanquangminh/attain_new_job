import { Module } from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { HireJobController } from './hire-job.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [HireJobController],
  providers: [HireJobService],
})
export class HireJobModule {}
