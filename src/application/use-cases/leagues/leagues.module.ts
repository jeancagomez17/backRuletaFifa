import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../infrastructure/prisma/prisma.module';
import { LeaguesService } from './leagues.service';

@Module({
  imports: [PrismaModule],
  providers: [LeaguesService],
  exports: [LeaguesService],
})
export class LeaguesModule {}
