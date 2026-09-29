import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { LeaguesModule } from './application/use-cases/leagues/leagues.module';
import { TeamsModule } from './application/use-cases/teams/teams.module';
import { CustomWheelsModule } from './application/use-cases/custom-wheels/custom-wheels.module';
import { GameSessionsModule } from './application/use-cases/game-sessions/game-sessions.module';
import { LeaguesController } from './interface/controllers/leagues.controller';
import { TeamsController } from './interface/controllers/teams.controller';
import { CustomWheelsController } from './interface/controllers/custom-wheels.controller';
import { GameSessionsController } from './interface/controllers/game-sessions.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    LeaguesModule,
    TeamsModule,
    CustomWheelsModule,
    GameSessionsModule,
  ],
  controllers: [
    LeaguesController,
    TeamsController,
    CustomWheelsController,
    GameSessionsController,
  ],
})
export class AppModule {}
