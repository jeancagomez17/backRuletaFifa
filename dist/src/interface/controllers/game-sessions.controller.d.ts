import { GameSessionsService } from '../../application/use-cases/game-sessions/game-sessions.service';
import { AddMatchDto } from '../dto/add-match.dto';
import { CreateGameSessionDto } from '../dto/create-game-session.dto';
export declare class GameSessionsController {
    private readonly gameSessionsService;
    constructor(gameSessionsService: GameSessionsService);
    create(dto: CreateGameSessionDto): Promise<{
        bet: {
            id: number;
            type: string;
            description: string;
            amount: string | null;
            winnerTakeAll: boolean;
            sessionId: number;
        } | null;
        players: ({
            player: {
                name: string;
                id: number;
            };
        } & {
            orderIndex: number;
            playerId: number;
            sessionId: number;
        })[];
        matches: {
            id: number;
            sessionId: number;
            player1Id: number;
            player2Id: number;
            winnerId: number | null;
            goals1: number;
            goals2: number;
            points: number;
        }[];
    } & {
        id: number;
        mode: string;
        status: string;
        currentRound: number;
        createdAt: Date;
    }>;
    findById(id: number): Promise<{
        bet: {
            id: number;
            type: string;
            description: string;
            amount: string | null;
            winnerTakeAll: boolean;
            sessionId: number;
        } | null;
        players: ({
            player: {
                name: string;
                id: number;
            };
        } & {
            orderIndex: number;
            playerId: number;
            sessionId: number;
        })[];
        matches: {
            id: number;
            sessionId: number;
            player1Id: number;
            player2Id: number;
            winnerId: number | null;
            goals1: number;
            goals2: number;
            points: number;
        }[];
    } & {
        id: number;
        mode: string;
        status: string;
        currentRound: number;
        createdAt: Date;
    }>;
    addMatch(id: number, dto: AddMatchDto): Promise<{
        id: number;
        sessionId: number;
        player1Id: number;
        player2Id: number;
        winnerId: number | null;
        goals1: number;
        goals2: number;
        points: number;
    }>;
    finish(id: number): Promise<import("../../domain/entities/game-session").SessionResult>;
}
