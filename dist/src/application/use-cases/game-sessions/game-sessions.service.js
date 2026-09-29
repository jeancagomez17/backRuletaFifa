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
exports.GameSessionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../infrastructure/prisma/prisma.service");
const game_session_1 = require("../../../domain/entities/game-session");
let GameSessionsService = class GameSessionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(input) {
        this.validatePlayerNames(input.playerNames);
        const players = await this.findOrCreatePlayers(input.playerNames);
        const session = await this.prisma.gameSession.create({
            data: {
                mode: input.mode,
                status: game_session_1.GameStatus.ACTIVE,
                players: {
                    create: players.map((player, index) => ({
                        playerId: player.id,
                        orderIndex: index,
                    })),
                },
                bet: input.bet ? { create: this.mapBetInput(input.bet) } : undefined,
            },
            include: {
                players: { include: { player: true }, orderBy: { orderIndex: 'asc' } },
                bet: true,
                matches: true,
            },
        });
        return session;
    }
    async findById(id) {
        const session = await this.prisma.gameSession.findUnique({
            where: { id },
            include: {
                players: { include: { player: true }, orderBy: { orderIndex: 'asc' } },
                matches: true,
                bet: true,
            },
        });
        if (!session) {
            throw new common_1.NotFoundException(`Game session ${id} not found`);
        }
        return session;
    }
    async addMatch(sessionId, input) {
        const session = await this.findById(sessionId);
        this.validateMatchInput(session, input);
        const winnerId = this.determineWinner(input);
        const match = await this.prisma.match.create({
            data: {
                sessionId,
                player1Id: input.player1Id,
                player2Id: input.player2Id,
                goals1: input.goals1,
                goals2: input.goals2,
                winnerId,
                points: winnerId ? 3 : 0,
            },
        });
        return match;
    }
    async finish(sessionId) {
        const session = await this.findById(sessionId);
        const result = this.calculateResult(session);
        if (session.status === game_session_1.GameStatus.ACTIVE) {
            await this.prisma.gameSession.update({
                where: { id: sessionId },
                data: { status: game_session_1.GameStatus.FINISHED },
            });
        }
        return result;
    }
    validatePlayerNames(playerNames) {
        if (!playerNames || playerNames.length < 2 || playerNames.length > 4) {
            throw new common_1.BadRequestException('Session needs 2 to 4 players');
        }
        const uniqueNames = new Set(playerNames.map((name) => name.trim()));
        if (uniqueNames.size !== playerNames.length) {
            throw new common_1.BadRequestException('Player names must be unique');
        }
    }
    async findOrCreatePlayers(playerNames) {
        const players = [];
        for (const name of playerNames) {
            const trimmed = name.trim();
            const existing = await this.prisma.player.findFirst({
                where: { name: trimmed },
            });
            if (existing) {
                players.push(existing);
            }
            else {
                const created = await this.prisma.player.create({
                    data: { name: trimmed },
                });
                players.push(created);
            }
        }
        return players;
    }
    mapBetInput(bet) {
        return {
            type: bet.type,
            description: bet.description,
            amount: bet.amount ?? null,
            winnerTakeAll: bet.winnerTakeAll ?? true,
        };
    }
    validateMatchInput(session, input) {
        const playerIds = session.players.map((sp) => sp.playerId);
        if (!playerIds.includes(input.player1Id) ||
            !playerIds.includes(input.player2Id)) {
            throw new common_1.BadRequestException('Players must belong to the session');
        }
        if (input.player1Id === input.player2Id) {
            throw new common_1.BadRequestException('A match needs two different players');
        }
        if (input.goals1 < 0 || input.goals2 < 0) {
            throw new common_1.BadRequestException('Goals cannot be negative');
        }
    }
    determineWinner(input) {
        if (input.goals1 > input.goals2)
            return input.player1Id;
        if (input.goals2 > input.goals1)
            return input.player2Id;
        return null;
    }
    calculateResult(session) {
        const players = session.players.map((sp) => sp.player);
        const playerResults = players.map((player) => {
            const playerMatches = session.matches.filter((match) => match.player1Id === player.id || match.player2Id === player.id);
            let goalsFor = 0;
            let goalsAgainst = 0;
            let points = 0;
            let wins = 0;
            for (const match of playerMatches) {
                const isPlayer1 = match.player1Id === player.id;
                goalsFor += isPlayer1 ? match.goals1 : match.goals2;
                goalsAgainst += isPlayer1 ? match.goals2 : match.goals1;
                if (match.winnerId === player.id) {
                    points += match.points;
                    wins += 1;
                }
            }
            return {
                playerId: player.id,
                name: player.name,
                played: playerMatches.length,
                wins,
                goalsFor,
                goalsAgainst,
                points,
            };
        });
        const sorted = [...playerResults].sort((a, b) => b.points - a.points || b.goalsFor - a.goalsFor);
        const winnerId = sorted.length > 0 && sorted[0].points > 0 ? sorted[0].playerId : null;
        const betWinnerId = session.bet?.winnerTakeAll ? winnerId : null;
        return {
            sessionId: session.id,
            status: game_session_1.GameStatus.FINISHED,
            players: sorted,
            winnerId,
            betWinnerId,
        };
    }
};
exports.GameSessionsService = GameSessionsService;
exports.GameSessionsService = GameSessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GameSessionsService);
//# sourceMappingURL=game-sessions.service.js.map