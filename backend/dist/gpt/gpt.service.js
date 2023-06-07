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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GptService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("openai");
let GptService = exports.GptService = class GptService {
    constructor(configService) {
        this.configService = configService;
    }
    async getGptResponse(messages) {
        const configuration = new openai_1.Configuration({
            apiKey: await this.configService.get('OPENAI_API_KEY'),
        });
        const openai = new openai_1.OpenAIApi(configuration);
        const response = await openai.createChatCompletion({
            messages,
            model: 'gpt-3.5-turbo',
        });
        const reply = response.data.choices[0].message.content;
        return reply;
    }
};
exports.GptService = GptService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GptService);
//# sourceMappingURL=gpt.service.js.map