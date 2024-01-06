import { Module } from '@nestjs/common';
import { DetailJobTypeService } from './detail-job-type.service';
import { DetailJobTypeController } from './detail-job-type.controller';

@Module({
  controllers: [DetailJobTypeController],
  providers: [DetailJobTypeService],
})
export class DetailJobTypeModule {}
