import { PartialType } from '@nestjs/swagger';
import { CreateDetailJobTypeDto } from './create-detail-job-type.dto';

export class UpdateDetailJobTypeDto extends PartialType(
  CreateDetailJobTypeDto,
) {}
