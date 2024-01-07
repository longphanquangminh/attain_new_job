import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiTags, ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { UploadJobImageDto } from './dto/upload-job-image.dto';

@ApiTags('job')
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() request, @Body() createJobDto: CreateJobDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.jobService.create(token, createJobDto);
  }

  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @Get('pagination-search')
  findJobPagination(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
  ) {
    return this.jobService.findJobPagination(+pageIndex, +pageSize, keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadJobImageDto,
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @Post('/upload-job-image/:id')
  upload(
    @Req() request,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const token = request.headers.authorization.split(' ')[1];
    return this.jobService.postJobImage(+id, token, file);
  }
}
