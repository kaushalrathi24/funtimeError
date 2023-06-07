import { Cache } from 'cache-manager';
import { GptService } from 'src/gpt/gpt.service';
import { NewNodeDto } from './dto/newNode.dto';
export declare class LinkedinService {
    private cacheManager;
    private gptService;
    constructor(cacheManager: Cache, gptService: GptService);
    handleLinkedinUrl(url: string): Promise<string>;
    generateNewNode(newNodeDto: NewNodeDto): Promise<string>;
}
