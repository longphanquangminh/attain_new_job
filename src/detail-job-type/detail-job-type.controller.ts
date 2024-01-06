import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DetailJobTypeService } from './detail-job-type.service';
import { CreateDetailJobTypeDto } from './dto/create-detail-job-type.dto';
import { UpdateDetailJobTypeDto } from './dto/update-detail-job-type.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('detail-job-type')
@Controller('detail-job-type')
export class DetailJobTypeController {
  constructor(private readonly detailJobTypeService: DetailJobTypeService) {}

  @Post()
  create(@Body() createDetailJobTypeDto: CreateDetailJobTypeDto) {
    return this.detailJobTypeService.create(createDetailJobTypeDto);
  }

  @Get()
  findAll() {
    return this.detailJobTypeService.findAll();
  }

  @Get('pagination-search')
  findDetailJobTypePagination(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
  ) {
    return this.detailJobTypeService.findDetailJobTypePagination(
      +pageIndex,
      +pageSize,
      keyword,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailJobTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetailJobTypeDto: UpdateDetailJobTypeDto,
  ) {
    return this.detailJobTypeService.update(+id, updateDetailJobTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailJobTypeService.remove(+id);
  }
}
