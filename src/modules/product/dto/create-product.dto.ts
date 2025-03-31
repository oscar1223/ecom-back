import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Nike Jordan 1', description: 'Nombre del producto' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Descripcion de Nike Jordan 1', description: 'Descripcion del producto' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 567, description: 'Precio del producto' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 5432, description: 'Relacion con el usuario por ID' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 432, description: 'Relacion con la categoria por ID' })
  @IsInt()
  @IsOptional()
  categoryId?: number;

  // Campo nuevo para la foto
  @ApiProperty({ example: 'base64 de la foto del producto', description: 'Foto del producto' })
  @IsString()
  @IsOptional()
  photo?: string; // Ej. URL a la imagen
}
