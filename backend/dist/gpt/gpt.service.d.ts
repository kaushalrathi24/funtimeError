import { ConfigService } from '@nestjs/config';
export declare class GptService {
    private configService;
    constructor(configService: ConfigService);
    getGptResponse(messages: any): Promise<string>;
}
