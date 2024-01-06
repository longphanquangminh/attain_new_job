import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';

@Controller('hire-job')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}

  @Post()
  create(@Body() createHireJobDto: CreateHireJobDto) {
    return this.hireJobService.create(createHireJobDto);
  }

  @Get()
  findAll() {
    return this.hireJobService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hireJobService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHireJobDto: UpdateHireJobDto) {
    return this.hireJobService.update(+id, updateHireJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hireJobService.remove(+id);
  }
}
