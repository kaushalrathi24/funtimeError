/// <reference types="multer" />
import { LinkedinService } from './linkedin.service';
import { NewNodeDto } from './dto/newNode.dto';
import { GetResourcesDto } from './dto/getResources.dto';
import { GetTimelineDto } from './dto/getTimeline.dto';
export declare class LinkedinController {
    private readonly linkedinService;
    constructor(linkedinService: LinkedinService);
    uploadFile(file: Express.Multer.File): Promise<{
        sessionId: string;
    }>;
    getSecondNodes(newNodeDto: NewNodeDto): Promise<string>;
    getResources(getResourcesDto: GetResourcesDto): Promise<string>;
    getTimeline(getTimelineDto: GetTimelineDto): Promise<string>;
}
