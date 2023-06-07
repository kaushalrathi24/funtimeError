import { Module } from '@nestjs/common';
import { GptModule } from 'src/gpt/gpt.module';
import { LinkedinController } from './linkedin.controller';
import { LinkedinService } from './linkedin.service';

@Module({
  imports: [GptModule],
  controllers: [LinkedinController],
  providers: [LinkedinService],
})
export class LinkedinModule {}
