import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { GameMode, SessionResult } from '../../../domain/entities/game-session';
export type CreateGameSessionInput = {
    mode: GameMode;
    playerNames: string[];
    bet?: {
        type: string;
        description: string;
        amount?: string;
        winnerTakeAll?: boolean;
    };
};
export type AddMatchInput = {
    player1Id: number;
    player2Id: number;
    goals1: number;
    goals2: number;
};
export declare class GameSessionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(input: CreateGameSessionInput): Promise<{
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
    addMatch(sessionId: number, input: AddMatchInput): Promise<{
        id: number;
        sessionId: number;
        player1Id: number;
        player2Id: number;
        winnerId: number | null;
        goals1: number;
        goals2: number;
        points: number;
    }>;
    finish(sessionId: number): Promise<SessionResult>;
    private validatePlayerNames;
    private findOrCreatePlayers;
    private mapBetInput;
    private validateMatchInput;
    private determineWinner;
    private calculateResult;
}
