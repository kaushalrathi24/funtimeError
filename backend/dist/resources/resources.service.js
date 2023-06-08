"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const bing_chat_1 = require("bing-chat");
let ResourcesService = exports.ResourcesService = class ResourcesService {
    async getBingChatResponse(sessionId, message) {
        const api = new bing_chat_1.BingChat({
            cookie: '_U',
        });
        const response = await api.sendMessage(sessionId);
        return response;
    }
};
exports.ResourcesService = ResourcesService = __decorate([
    (0, common_1.Injectable)()
], ResourcesService);
//# sourceMappingURL=resources.service.js.map