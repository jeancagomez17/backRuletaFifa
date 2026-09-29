import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GameSessionsService } from '../../application/use-cases/game-sessions/game-sessions.service';
import { AddMatchDto } from '../dto/add-match.dto';
import { CreateGameSessionDto } from '../dto/create-game-session.dto';
import { GameMode } from '../../domain/entities/game-session';

@Controller('game-sessions')
export class GameSessionsController {
  constructor(private readonly gameSessionsService: GameSessionsService) {}

  @Post()
  async create(@Body() dto: CreateGameSessionDto) {
    const mode = dto.mode === 'custom' ? GameMode.CUSTOM : GameMode.LEAGUE;
    return this.gameSessionsService.create({
      mode,
      playerNames: dto.playerNames,
      bet: dto.bet,
    });
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.gameSessionsService.findById(id);
  }

  @Post(':id/matches')
  async addMatch(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AddMatchDto,
  ) {
    return this.gameSessionsService.addMatch(id, dto);
  }

  @Post(':id/finish')
  async finish(@Param('id', ParseIntPipe) id: number) {
    return this.gameSessionsService.finish(id);
  }
}
