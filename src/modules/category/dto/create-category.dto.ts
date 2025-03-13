import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Zapatos', description: 'Nombre de la categoria' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Descripcion de la categoria', description: 'Descripcion de la categoria' })
  @IsString()
  @IsOptional()
  description?: string;
}
