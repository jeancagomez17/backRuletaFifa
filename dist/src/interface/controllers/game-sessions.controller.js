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
exports.GameSessionsController = void 0;
const common_1 = require("@nestjs/common");
const game_sessions_service_1 = require("../../application/use-cases/game-sessions/game-sessions.service");
const add_match_dto_1 = require("../dto/add-match.dto");
const create_game_session_dto_1 = require("../dto/create-game-session.dto");
const game_session_1 = require("../../domain/entities/game-session");
let GameSessionsController = class GameSessionsController {
    constructor(gameSessionsService) {
        this.gameSessionsService = gameSessionsService;
    }
    async create(dto) {
        const mode = dto.mode === 'custom' ? game_session_1.GameMode.CUSTOM : game_session_1.GameMode.LEAGUE;
        return this.gameSessionsService.create({
            mode,
            playerNames: dto.playerNames,
            bet: dto.bet,
        });
    }
    async findById(id) {
        return this.gameSessionsService.findById(id);
    }
    async addMatch(id, dto) {
        return this.gameSessionsService.addMatch(id, dto);
    }
    async finish(id) {
        return this.gameSessionsService.finish(id);
    }
};
exports.GameSessionsController = GameSessionsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_game_session_dto_1.CreateGameSessionDto]),
    __metadata("design:returntype", Promise)
], GameSessionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameSessionsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(':id/matches'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, add_match_dto_1.AddMatchDto]),
    __metadata("design:returntype", Promise)
], GameSessionsController.prototype, "addMatch", null);
__decorate([
    (0, common_1.Post)(':id/finish'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameSessionsController.prototype, "finish", null);
exports.GameSessionsController = GameSessionsController = __decorate([
    (0, common_1.Controller)('game-sessions'),
    __metadata("design:paramtypes", [game_sessions_service_1.GameSessionsService])
], GameSessionsController);
//# sourceMappingURL=game-sessions.controller.js.map