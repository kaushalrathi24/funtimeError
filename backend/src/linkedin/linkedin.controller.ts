import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LinkedinService } from './linkedin.service';
import { NewNodeDto } from './dto/newNode.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('linkedin')
export class LinkedinController {
  constructor(private readonly linkedinService: LinkedinService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const fileName = `${file.originalname}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.linkedinService.getInitialNode(file.filename);
  }

  @Post('secondNodes')
  async getSecondNodes(@Body() newNodeDto: NewNodeDto) {
    return await this.linkedinService.generateSecondNodes(newNodeDto);
  }
}
