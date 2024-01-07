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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/search/:uName')
  findName(@Param('uName') uName: string) {
    return this.userService.findName(uName);
  }

  @Get('pagination-search')
  findNamePagination(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
  ) {
    return this.userService.findNamePagination(+pageIndex, +pageSize, keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadAvatarDto,
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + '_' + file.originalname),
      }),
    }),
  )
  @Post('/upload-avatar')
  upload(@Req() request, @UploadedFile() file: Express.Multer.File) {
    const token = request.headers.authorization.split(' ')[1];
    return this.userService.postAvatar(token, file);
  }
}
