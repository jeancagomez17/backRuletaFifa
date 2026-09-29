import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CustomWheelsService } from '../../application/use-cases/custom-wheels/custom-wheels.service';
import { CreateCustomWheelDto } from '../dto/create-custom-wheel.dto';

@Controller('custom-wheels')
export class CustomWheelsController {
  constructor(private readonly customWheelsService: CustomWheelsService) {}

  @Post()
  async create(@Body() dto: CreateCustomWheelDto) {
    return this.customWheelsService.create({
      name: dto.name,
      teamIds: dto.teamIds,
    });
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.customWheelsService.findById(id);
  }

  @Get(':id/random-team')
  async findRandomTeam(@Param('id', ParseIntPipe) id: number) {
    return this.customWheelsService.findRandomTeam(id);
  }
}
