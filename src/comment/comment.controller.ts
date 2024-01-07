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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() request, @Body() createCommentDto: CreateCommentDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.commentService.create(token, createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const token = request.headers.authorization.split(' ')[1];
    return this.commentService.update(+id, token, updateCommentDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Req() request, @Param('id') id: string) {
    const token = request.headers.authorization.split(' ')[1];
    return this.commentService.remove(+id, token);
  }

  @Get('get-comments-by-job/:jobId')
  getCommentsByJob(@Param('jobId') jobId: string) {
    return this.commentService.getCommentsByJob(+jobId);
  }
}
