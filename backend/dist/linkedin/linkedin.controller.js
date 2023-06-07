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
exports.LinkedinController = void 0;
const common_1 = require("@nestjs/common");
const linkedinUrl_dto_1 = require("./dto/linkedinUrl.dto");
const linkedin_service_1 = require("./linkedin.service");
const newNode_dto_1 = require("./dto/newNode.dto");
let LinkedinController = exports.LinkedinController = class LinkedinController {
    constructor(linkedinService) {
        this.linkedinService = linkedinService;
    }
    async getLinkedinUrl(linkedinUrlDto) {
        return await this.linkedinService.handleLinkedinUrl(linkedinUrlDto.url);
    }
    async getNewNodes(newNodeDto) {
        return await this.linkedinService.generateNewNode(newNodeDto);
    }
};
__decorate([
    (0, common_1.Post)('url'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [linkedinUrl_dto_1.LinkedinUrlDto]),
    __metadata("design:returntype", Promise)
], LinkedinController.prototype, "getLinkedinUrl", null);
__decorate([
    (0, common_1.Post)('newNode'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [newNode_dto_1.NewNodeDto]),
    __metadata("design:returntype", Promise)
], LinkedinController.prototype, "getNewNodes", null);
exports.LinkedinController = LinkedinController = __decorate([
    (0, common_1.Controller)('linkedin'),
    __metadata("design:paramtypes", [linkedin_service_1.LinkedinService])
], LinkedinController);
//# sourceMappingURL=linkedin.controller.js.map