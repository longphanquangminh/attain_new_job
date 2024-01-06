import { Injectable } from '@nestjs/common';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';

@Injectable()
export class HireJobService {
  create(createHireJobDto: CreateHireJobDto) {
    return 'This action adds a new hireJob';
  }

  findAll() {
    return `This action returns all hireJob`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hireJob`;
  }

  update(id: number, updateHireJobDto: UpdateHireJobDto) {
    return `This action updates a #${id} hireJob`;
  }

  remove(id: number) {
    return `This action removes a #${id} hireJob`;
  }
}
