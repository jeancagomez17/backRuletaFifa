import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';

export type CreateCustomWheelInput = {
  name: string;
  teamIds: number[];
};

@Injectable()
export class CustomWheelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateCustomWheelInput) {
    if (!input.name || input.name.trim().length === 0) {
      throw new BadRequestException('Wheel name is required');
    }
    if (!input.teamIds || input.teamIds.length === 0) {
      throw new BadRequestException('At least one team is required');
    }

    return this.prisma.customWheel.create({
      data: {
        name: input.name.trim(),
        teams: {
          create: input.teamIds.map((teamId) => ({ teamId })),
        },
      },
      include: { teams: { include: { team: true } } },
    });
  }

  async findById(id: number) {
    const wheel = await this.prisma.customWheel.findUnique({
      where: { id },
      include: { teams: { include: { team: true } } },
    });
    if (!wheel) {
      throw new NotFoundException(`Custom wheel ${id} not found`);
    }
    return wheel;
  }

  async findRandomTeam(id: number) {
    const wheel = await this.findById(id);
    if (wheel.teams.length === 0) {
      throw new NotFoundException(`Custom wheel ${id} has no teams`);
    }
    const index = Math.floor(Math.random() * wheel.teams.length);
    return wheel.teams[index].team;
  }
}
