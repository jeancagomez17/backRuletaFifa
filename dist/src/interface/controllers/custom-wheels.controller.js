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
exports.CustomWheelsController = void 0;
const common_1 = require("@nestjs/common");
const custom_wheels_service_1 = require("../../application/use-cases/custom-wheels/custom-wheels.service");
const create_custom_wheel_dto_1 = require("../dto/create-custom-wheel.dto");
let CustomWheelsController = class CustomWheelsController {
    constructor(customWheelsService) {
        this.customWheelsService = customWheelsService;
    }
    async create(dto) {
        return this.customWheelsService.create({
            name: dto.name,
            teamIds: dto.teamIds,
        });
    }
    async findById(id) {
        return this.customWheelsService.findById(id);
    }
    async findRandomTeam(id) {
        return this.customWheelsService.findRandomTeam(id);
    }
};
exports.CustomWheelsController = CustomWheelsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_custom_wheel_dto_1.CreateCustomWheelDto]),
    __metadata("design:returntype", Promise)
], CustomWheelsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomWheelsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/random-team'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomWheelsController.prototype, "findRandomTeam", null);
exports.CustomWheelsController = CustomWheelsController = __decorate([
    (0, common_1.Controller)('custom-wheels'),
    __metadata("design:paramtypes", [custom_wheels_service_1.CustomWheelsService])
], CustomWheelsController);
//# sourceMappingURL=custom-wheels.controller.js.map