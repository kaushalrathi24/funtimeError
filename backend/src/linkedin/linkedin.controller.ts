import { Body, Controller, Post } from '@nestjs/common';
import { LinkedinUrlDto } from './dto/linkedinUrl.dto';
import { LinkedinService } from './linkedin.service';
import { NewNodeDto } from './dto/newNode.dto';

@Controller('linkedin')
export class LinkedinController {
  constructor(private readonly linkedinService: LinkedinService) {}

  @Post('url')
  async getLinkedinUrl(@Body() linkedinUrlDto: LinkedinUrlDto) {
    return await this.linkedinService.handleLinkedinUrl(linkedinUrlDto.url);
  }

  @Post('newNode')
  async getNewNodes(@Body() newNodeDto: NewNodeDto) {
    return await this.linkedinService.generateNewNode(newNodeDto);
  }
}
