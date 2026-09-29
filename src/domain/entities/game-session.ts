export enum GameMode {
  LEAGUE = 'league',
  CUSTOM = 'custom',
}

export enum GameStatus {
  ACTIVE = 'active',
  FINISHED = 'finished',
}

export enum BetType {
  MONEY = 'money',
  ITEM = 'item',
}

export type SessionResult = {
  sessionId: number;
  status: GameStatus;
  players: PlayerResult[];
  winnerId: number | null;
  betWinnerId: number | null;
};

export type PlayerResult = {
  playerId: number;
  name: string;
  played: number;
  wins: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};
