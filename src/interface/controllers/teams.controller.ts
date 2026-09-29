import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TeamsService } from '../../application/use-cases/teams/teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async findByLeague(@Query('leagueId', ParseIntPipe) leagueId: number) {
    if (!leagueId) {
      throw new BadRequestException('leagueId is required');
    }
    return this.teamsService.findByLeague(leagueId);
  }

  @Get('random')
  async findRandomByLeague(@Query('leagueId', ParseIntPipe) leagueId: number) {
    if (!leagueId) {
      throw new BadRequestException('leagueId is required');
    }
    return this.teamsService.findRandomByLeague(leagueId);
  }
}
