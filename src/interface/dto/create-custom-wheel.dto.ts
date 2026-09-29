import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCustomWheelDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsArray()
  @IsInt({ each: true })
  teamIds: number[];
}
