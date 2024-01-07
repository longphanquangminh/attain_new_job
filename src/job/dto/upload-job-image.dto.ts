import { ApiProperty } from '@nestjs/swagger';

export class UploadJobImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.Multer.File;
}
