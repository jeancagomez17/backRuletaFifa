import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

@Injectable()
export class LeaguesService {
  constructor(private readonly prisma: PrismaService) {}

  async findActive() {
    return this.prisma.league.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });
  }

  async findRandomActive() {
    const leagues = await this.findActive();
    if (leagues.length === 0) {
      throw new NotFoundException('No active leagues found');
    }
    const index = Math.floor(Math.random() * leagues.length);
    return leagues[index];
  }
}
