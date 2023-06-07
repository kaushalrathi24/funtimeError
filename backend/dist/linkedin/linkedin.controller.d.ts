import { LinkedinUrlDto } from './dto/linkedinUrl.dto';
import { LinkedinService } from './linkedin.service';
import { NewNodeDto } from './dto/newNode.dto';
export declare class LinkedinController {
    private readonly linkedinService;
    constructor(linkedinService: LinkedinService);
    getLinkedinUrl(linkedinUrlDto: LinkedinUrlDto): Promise<string>;
    getNewNodes(newNodeDto: NewNodeDto): Promise<string>;
}
