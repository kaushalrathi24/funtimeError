/// <reference types="multer" />
import { LinkedinService } from './linkedin.service';
import { NewNodeDto } from './dto/newNode.dto';
export declare class LinkedinController {
    private readonly linkedinService;
    constructor(linkedinService: LinkedinService);
    uploadFile(file: Express.Multer.File): Promise<{
        sessionId: string;
    }>;
    getSecondNodes(newNodeDto: NewNodeDto): Promise<string>;
}
