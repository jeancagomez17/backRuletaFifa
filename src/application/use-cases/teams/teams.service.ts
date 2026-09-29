import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByLeague(leagueId: number) {
    return this.prisma.team.findMany({
      where: { leagueId },
      orderBy: { name: 'asc' },
    });
  }

  async findRandomByLeague(leagueId: number) {
    const teams = await this.findByLeague(leagueId);
    if (teams.length === 0) {
      throw new NotFoundException(`No teams found for league ${leagueId}`);
    }
    const index = Math.floor(Math.random() * teams.length);
    return teams[index];
  }
}
