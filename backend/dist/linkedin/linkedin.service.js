"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedinService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const uuidv4_1 = require("uuidv4");
const gpt_service_1 = require("../gpt/gpt.service");
let LinkedinService = exports.LinkedinService = class LinkedinService {
    constructor(cacheManager, gptService) {
        this.cacheManager = cacheManager;
        this.gptService = gptService;
    }
    async handleLinkedinUrl(url) {
        const sessionId = (0, uuidv4_1.uuid)();
        const data = `About: I am Harsh Avinash, a computer science engineer with a specialization in data science, I've handled roles of product management and have a reputation of delivering quality work on time. I'm best seen in roles of leadership and have a history of handling responsibility well. 
I'm competitive, curious and humbled to see what the world has to offer, looking forward to new and exciting opportunities.

Experience:

Research Fellow
Indian Institute of Technology, Delhi · Internship

ACM-VIT Chapter
Chairperson

Frontend Developer and Designer
Procial

Product Manager and Data Analyst
Cypherock


EDUCATION:

Vellore Institute of Technology
B. Tech Data Science


SKILLS:
React
LLM
Machine Learning
Solidity
Rust
Next
AWS
Docker
Deep Learning
Tensorflow
Leadership`;
        const messages = [
            {
                role: 'user',
                content: 'I am going to give you some information about a candidate in an ATS. Tell me what career paths are possible because of which skills, which skills need to be worked on for certain paths, all in a highly structured manner.',
            },
            { role: 'user', content: data },
        ];
        await this.cacheManager.set(sessionId, messages);
        const reply = await this.gptService.getGptResponse(messages);
        console.log(reply);
        messages.push({ role: 'assistant', content: reply });
        return reply;
    }
    async generateNewNode(newNodeDto) {
        const { sessionId, node } = newNodeDto;
        const messages = Array(await this.cacheManager.get(sessionId));
        const newMessage = `Can i get roles in the  ${node} domain?`;
        messages.push({ role: 'user', content: newMessage });
        const reply = await this.gptService.getGptResponse(messages);
        console.log(reply);
        return reply;
    }
};
exports.LinkedinService = LinkedinService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(1, (0, common_1.Inject)(gpt_service_1.GptService)),
    __metadata("design:paramtypes", [Object, gpt_service_1.GptService])
], LinkedinService);
//# sourceMappingURL=linkedin.service.js.map