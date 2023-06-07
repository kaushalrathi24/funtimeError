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
const axios_1 = require("axios");
let LinkedinService = exports.LinkedinService = class LinkedinService {
    constructor(cacheManager, gptService) {
        this.cacheManager = cacheManager;
        this.gptService = gptService;
    }
    async generateSecondNodes(newNodeDto) {
        const { sessionId, node } = newNodeDto;
        const messages = (await this.cacheManager.get(sessionId));
        const newMessage = `This is a strict requirement: The scope and domain of the jobs have to be limited to ${node} Domain.
Using the information in your previous response and the data provided to you before, please categorize those job positions into relevant categories.
Use one or more of the following criteria to categorize the job positions:
logical and industrial domains, required skill sets, levels of responsibility, and similarities and characteristics.

You have to give an output in the following JSON format:

{
"name":"<CandidateName>",
"designation":"<Designation>",
"nodes": [ {
    "title":"<Category 1>"
}, 
{
    "title":"<Category 2>"
}, 
{
    "title":<Category 3>"
},
{
    "title":<Category 4>"
} ]
}

This is a strict requirement: You need to generate only 4 different Categories.`;
        console.log(typeof messages);
        console.log(messages);
        messages.push({ role: 'user', content: newMessage });
        console.log(messages);
        const reply = await this.gptService.getGptResponse(messages);
        console.log(reply);
        messages.push({ role: 'assistant', content: reply });
        await this.cacheManager.set(sessionId, messages);
        return reply;
    }
    async getInitialNode(filename) {
        console.log(filename);
        const resume = await axios_1.default.get(`https://3062-136-233-9-98.ngrok-free.app/converter/${filename}`);
        const messages = [
            {
                role: 'user',
                content: `I am going to give you some information about a candidate in an ATS. Tell me what career domains are possible because of which skills, all in a highly structured manner.

Your input will be data in text format, a copy of all the text in their resume

Create a list of job positions that a person with the given profile will be able to transition into. 
The criteria for such a job position are that there needs to be at most a 15% intersection between the skills required for that job position and the skills that the person currently has.
List jobs that don't fall under the same logical and technical domains.
This is a strict requirement: You need to list at least 15 different job positions, with minimal overlap between them.`,
            },
            { role: 'user', content: resume.data },
        ];
        const sessionId = (0, uuidv4_1.uuid)();
        console.log(messages);
        const reply = await this.gptService.getGptResponse(messages);
        messages.push({ role: 'assistant', content: reply });
        console.log(messages);
        await this.cacheManager.set(sessionId, messages);
        console.log((await this.cacheManager.get(sessionId))[0]);
        return { sessionId };
    }
};
exports.LinkedinService = LinkedinService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __param(1, (0, common_1.Inject)(gpt_service_1.GptService)),
    __metadata("design:paramtypes", [Object, gpt_service_1.GptService])
], LinkedinService);
//# sourceMappingURL=linkedin.service.js.map