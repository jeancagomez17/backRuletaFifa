import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { LeaguesService } from '../../application/use-cases/leagues/leagues.service';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Get()
  async findAll() {
    return this.leaguesService.findActive();
  }

  @Get('random')
  async findRandom() {
    return this.leaguesService.findRandomActive();
  }
}
