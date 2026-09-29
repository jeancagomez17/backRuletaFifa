import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import {
  GameMode,
  GameStatus,
  PlayerResult,
  SessionResult,
} from '../../../domain/entities/game-session';

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

@Injectable()
export class GameSessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateGameSessionInput) {
    this.validatePlayerNames(input.playerNames);

    const players = await this.findOrCreatePlayers(input.playerNames);
    const session = await this.prisma.gameSession.create({
      data: {
        mode: input.mode,
        status: GameStatus.ACTIVE,
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

  async findById(id: number) {
    const session = await this.prisma.gameSession.findUnique({
      where: { id },
      include: {
        players: { include: { player: true }, orderBy: { orderIndex: 'asc' } },
        matches: true,
        bet: true,
      },
    });
    if (!session) {
      throw new NotFoundException(`Game session ${id} not found`);
    }
    return session;
  }

  async addMatch(sessionId: number, input: AddMatchInput) {
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

  async finish(sessionId: number): Promise<SessionResult> {
    const session = await this.findById(sessionId);
    const result = this.calculateResult(session);
    if (session.status === GameStatus.ACTIVE) {
      await this.prisma.gameSession.update({
        where: { id: sessionId },
        data: { status: GameStatus.FINISHED },
      });
    }
    return result;
  }

  private validatePlayerNames(playerNames: string[]) {
    if (!playerNames || playerNames.length < 2 || playerNames.length > 4) {
      throw new BadRequestException('Session needs 2 to 4 players');
    }
    const uniqueNames = new Set(playerNames.map((name) => name.trim()));
    if (uniqueNames.size !== playerNames.length) {
      throw new BadRequestException('Player names must be unique');
    }
  }

  private async findOrCreatePlayers(playerNames: string[]) {
    const players = [];
    for (const name of playerNames) {
      const trimmed = name.trim();
      const existing = await this.prisma.player.findFirst({
        where: { name: trimmed },
      });
      if (existing) {
        players.push(existing);
      } else {
        const created = await this.prisma.player.create({
          data: { name: trimmed },
        });
        players.push(created);
      }
    }
    return players;
  }

  private mapBetInput(bet: NonNullable<CreateGameSessionInput['bet']>) {
    return {
      type: bet.type,
      description: bet.description,
      amount: bet.amount ?? null,
      winnerTakeAll: bet.winnerTakeAll ?? true,
    };
  }

  private validateMatchInput(
    session: Awaited<ReturnType<typeof this.findById>>,
    input: AddMatchInput,
  ) {
    const playerIds = session.players.map((sp) => sp.playerId);
    if (
      !playerIds.includes(input.player1Id) ||
      !playerIds.includes(input.player2Id)
    ) {
      throw new BadRequestException('Players must belong to the session');
    }
    if (input.player1Id === input.player2Id) {
      throw new BadRequestException('A match needs two different players');
    }
    if (input.goals1 < 0 || input.goals2 < 0) {
      throw new BadRequestException('Goals cannot be negative');
    }
  }

  private determineWinner(input: AddMatchInput): number | null {
    if (input.goals1 > input.goals2) return input.player1Id;
    if (input.goals2 > input.goals1) return input.player2Id;
    return null;
  }

  private calculateResult(
    session: Awaited<ReturnType<typeof this.findById>>,
  ): SessionResult {
    const players = session.players.map((sp) => sp.player);
    const playerResults: PlayerResult[] = players.map((player) => {
      const playerMatches = session.matches.filter(
        (match) =>
          match.player1Id === player.id || match.player2Id === player.id,
      );
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

    const sorted = [...playerResults].sort(
      (a, b) => b.points - a.points || b.goalsFor - a.goalsFor,
    );
    const winnerId =
      sorted.length > 0 && sorted[0].points > 0 ? sorted[0].playerId : null;
    const betWinnerId = session.bet?.winnerTakeAll ? winnerId : null;

    return {
      sessionId: session.id,
      status: GameStatus.FINISHED,
      players: sorted,
      winnerId,
      betWinnerId,
    };
  }
}
