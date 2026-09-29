export declare class BetDto {
    type: string;
    description: string;
    amount?: string;
    winnerTakeAll?: boolean;
}
export declare class CreateGameSessionDto {
    mode: string;
    playerNames: string[];
    customWheelId?: string;
    bet?: BetDto;
}
