import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 'Nike Jordan Retro 11', description: 'Nuevo nombre del producto' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Descripcion de Nike Jordan Retro 11', description: 'Nueva descripcion del producto' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 567, description: 'Nuevo precio del producto' })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 5432, description: 'Relacion con el usuario por ID' })
  @IsInt()
  @IsOptional()
  userId?: number;

  @ApiProperty({ example: 432, description: 'Relacion con la categoria por ID' })
  @IsInt()
  @IsOptional()
  categoryId?: number;
}
