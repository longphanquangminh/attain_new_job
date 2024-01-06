import { PartialType } from '@nestjs/swagger';
import { CreateHireJobDto } from './create-hire-job.dto';

export class UpdateHireJobDto extends PartialType(CreateHireJobDto) {}
