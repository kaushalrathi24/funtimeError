import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class GptService {
  constructor(private configService: ConfigService) {}
  async getGptResponse(messages) {
    const configuration = new Configuration({
      apiKey: await this.configService.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      messages,
      model: 'gpt-3.5-turbo',
    });
    const reply = response.data.choices[0].message.content;
    return reply;
  }
}
