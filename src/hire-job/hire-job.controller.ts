import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('hire-job')
@Controller('hire-job')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() request, @Body() createJobDto: CreateHireJobDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.hireJobService.create(token, createJobDto);
  }

  @Get()
  findAll() {
    return this.hireJobService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hireJobService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateJobDto: UpdateHireJobDto,
  ) {
    const token = request.headers.authorization.split(' ')[1];
    return this.hireJobService.update(+id, token, updateJobDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Req() request, @Param('id') id: string) {
    const token = request.headers.authorization.split(' ')[1];
    return this.hireJobService.remove(+id, token);
  }
}
