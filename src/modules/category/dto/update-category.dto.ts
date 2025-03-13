import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Zapatillas', description: 'Nombre nuevo de la categoria' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Descripcion nueva de la categoria', description: 'Descripcion nueva de la categoria' })
  @IsString()
  @IsOptional()
  description?: string;
}