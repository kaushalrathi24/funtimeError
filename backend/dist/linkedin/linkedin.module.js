"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedinModule = void 0;
const common_1 = require("@nestjs/common");
const gpt_module_1 = require("../gpt/gpt.module");
const linkedin_controller_1 = require("./linkedin.controller");
const linkedin_service_1 = require("./linkedin.service");
let LinkedinModule = exports.LinkedinModule = class LinkedinModule {
};
exports.LinkedinModule = LinkedinModule = __decorate([
    (0, common_1.Module)({
        imports: [gpt_module_1.GptModule],
        controllers: [linkedin_controller_1.LinkedinController],
        providers: [linkedin_service_1.LinkedinService],
    })
], LinkedinModule);
//# sourceMappingURL=linkedin.module.js.map