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
exports.CustomWheelsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
let CustomWheelsService = class CustomWheelsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(input) {
        if (!input.name || input.name.trim().length === 0) {
            throw new common_1.BadRequestException('Wheel name is required');
        }
        if (!input.teamIds || input.teamIds.length === 0) {
            throw new common_1.BadRequestException('At least one team is required');
        }
        return this.prisma.customWheel.create({
            data: {
                name: input.name.trim(),
                teams: {
                    create: input.teamIds.map((teamId) => ({ teamId })),
                },
            },
            include: { teams: { include: { team: true } } },
        });
    }
    async findById(id) {
        const wheel = await this.prisma.customWheel.findUnique({
            where: { id },
            include: { teams: { include: { team: true } } },
        });
        if (!wheel) {
            throw new common_1.NotFoundException(`Custom wheel ${id} not found`);
        }
        return wheel;
    }
    async findRandomTeam(id) {
        const wheel = await this.findById(id);
        if (wheel.teams.length === 0) {
            throw new common_1.NotFoundException(`Custom wheel ${id} has no teams`);
        }
        const index = Math.floor(Math.random() * wheel.teams.length);
        return wheel.teams[index].team;
    }
};
exports.CustomWheelsService = CustomWheelsService;
exports.CustomWheelsService = CustomWheelsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomWheelsService);
//# sourceMappingURL=custom-wheels.service.js.map