import {
  IsArray,
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BetDto {
  @IsIn(['money', 'item'])
  type: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsOptional()
  @IsString()
  amount?: string;

  @IsOptional()
  @IsBoolean()
  winnerTakeAll?: boolean;
}

export class CreateGameSessionDto {
  @IsIn(['league', 'custom'])
  mode: string;

  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  playerNames: string[];

  @IsOptional()
  @IsString()
  customWheelId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => BetDto)
  bet?: BetDto;
}
