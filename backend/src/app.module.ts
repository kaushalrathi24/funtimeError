import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptModule } from './gpt/gpt.module';
import { LinkedinModule } from './linkedin/linkedin.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    GptModule,
    LinkedinModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 0,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
