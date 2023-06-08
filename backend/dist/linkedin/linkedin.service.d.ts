import { Cache } from 'cache-manager';
import { GptService } from 'src/gpt/gpt.service';
import { NewNodeDto } from './dto/newNode.dto';
import { GetResourcesDto } from './dto/getResources.dto';
export declare class LinkedinService {
    private cacheManager;
    private gptService;
    constructor(cacheManager: Cache, gptService: GptService);
    generateSecondNodes(newNodeDto: NewNodeDto): Promise<string>;
    getInitialNode(filename: string): Promise<{
        sessionId: string;
    }>;
    getResources(getResourcesDto: GetResourcesDto): Promise<string>;
}
