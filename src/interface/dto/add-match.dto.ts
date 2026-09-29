import { IsInt, IsPositive, Min } from 'class-validator';

export class AddMatchDto {
  @IsInt()
  @IsPositive()
  player1Id: number;

  @IsInt()
  @IsPositive()
  player2Id: number;

  @IsInt()
  @Min(0)
  goals1: number;

  @IsInt()
  @Min(0)
  goals2: number;
}
