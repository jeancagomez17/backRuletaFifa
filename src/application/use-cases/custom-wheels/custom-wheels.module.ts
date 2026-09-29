import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../infrastructure/prisma/prisma.module';
import { CustomWheelsService } from './custom-wheels.service';

@Module({
  imports: [PrismaModule],
  providers: [CustomWheelsService],
  exports: [CustomWheelsService],
})
export class CustomWheelsModule {}
